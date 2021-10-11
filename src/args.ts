const today = new Date();

const argTypes = {
  year: {
    key: "",
    parse: (rawValue: string) => parseInt(rawValue),
    default: today.getFullYear(),
  },
  month: {
    parse: (rawValue: string) => parseInt(rawValue),
    default: today.getMonth() + 1, // 今月
  },
} as const;

type Args = {
  [K in keyof typeof argTypes]: ReturnType<typeof argTypes[K]["parse"]>;
};

function parseArgs() {
  return Object.entries(argTypes).reduce((acc, [argKey, argType]) => {
    const argKV = process.argv
      .map((arg) => arg.split("=", 2))
      .find((_argKV) => _argKV.length == 2 && _argKV[0] == argKey);
    acc[argKey] = argKV ? argType.parse(argKV[1]) : argType.default;
    return acc;
  }, {} as any) as Args;
}

export default parseArgs();
