require("dotenv").config();

export default {
  EMAIL: process.env.EMAIL as string,
  PASSWORD: process.env.PASSWORD as string,
} as const;
