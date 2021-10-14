import { chromium } from "playwright";
import { screenshotPath } from "./utils";
import env from "./env";
import args from "./args";
import urls from "./urls";
import selectors from "./selectors";

const main = async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(urls.startUrl());
  await page.click(selectors.loginButton());
  await page.screenshot({ path: screenshotPath(`example.png`) });
  await page.fill(selectors.emailInput(), env.EMAIL);
  await page.click(selectors.submitButton());
  await page.fill(selectors.passwordInput(), env.PASSWORD);
  await page.click(selectors.submitButton());
  await page.goto(urls.attendanceUrl(args.year, args.month));
  const timeInputs = await page.$$(selectors.timeInput());
  let index = 0;
  for (const timeInput of timeInputs) {
    const inputColumn = inputColumns[index % inputColumns.length];
    const getValue = inputColumn.getValue;
    if (getValue) {
      const timeString = getValue();
      await timeInput.fill(timeString);
    }
    index++;
  }
};

type TimeRange = [string, string];

const businessTime = {
  start: ["09:00", "11:00"] as TimeRange,
  end: ["19:00", "22:00"] as TimeRange,
};

const inputColumns = [
  {
    getValue: () => getRandomTimeString(businessTime.start),
  },
  {
    getValue: () => getRandomTimeString(businessTime.end),
  },
  {},
  {},
];

const getRandomTimeString = (timeRange: TimeRange) => {
  const timeValueRange = timeRange.map((timeString) => {
    const times = timeString.split(":");
    const hour = parseInt(times[0]);
    const minutes = parseInt(times[1]);
    return hour + minutes / 60;
  });

  const randomTime =
    Math.random() * (timeValueRange[1] - timeValueRange[0]) + timeValueRange[0];

  const hour = Math.floor(randomTime);
  const minutes = Math.floor((randomTime * 60) % 60);
  return `${("0" + hour).slice(-2)}:${("0" + minutes).slice(-2)}`;
};

export default main;
