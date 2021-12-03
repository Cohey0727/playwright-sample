import { chromium, ElementHandle } from "playwright";
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
  const calendarRows = await page.$$(selectors.calendarRow());
  for (const calendarRow of calendarRows) {
    const dayCell = await calendarRow.$(selectors.classificationCell());
    console.log(dayCell);
    if (!(await isWorkday(dayCell))) continue;
    const inputCells = await calendarRow.$$(selectors.inputCell());
    const timeInputValues = Object.values(timeInputs);
    for (const timeInput of timeInputValues) {
      const { index, getValue } = timeInput;
      const inputCell = inputCells[index];
      const timeCell = await inputCell.$(selectors.timeInput());
      if (getValue) {
        const value = getValue();
        timeCell?.fill(value);
      }
    }
  }
};

type TimeRange = [string, string];

const businessTime = {
  start: ["09:00", "11:00"] as TimeRange,
  end: ["19:00", "22:00"] as TimeRange,
};

const timeInputs = {
  attendanceStart: {
    index: 0,
    getValue: () => getRandomTimeString(businessTime.start),
  },
  attendanceEnd: {
    index: 1,
    getValue: () => getRandomTimeString(businessTime.end),
  },
  breakStart: {
    index: 2,
    getValue: null,
  },
  breakEnd: {
    index: 3,
    getValue: null,
  },
};

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

const workDayKeyword = "平日";
const isWorkday = async (
  dayCell: ElementHandle<SVGElement | HTMLElement> | null
) => {
  console.log(dayCell);
  if (dayCell === null) return false;
  const innerText = await dayCell.innerText();
  return innerText.includes(workDayKeyword);
};

export default main;
