import dayjs from 'dayjs';
import ko from 'dayjs/locale/ko';
import isBetweenPlugin from 'dayjs/plugin/isBetween';

dayjs.extend(isBetweenPlugin);

// https://github.com/iamkun/dayjs/issues/215#issuecomment-471280396
dayjs.locale({
  ...ko,
  weekStart: 1,
});

export const FORMATS = {
  DATE_TIME: 'YYYY.MM.DD HH:mm:ss',
  DATE: 'YYYY.MM.DD',
} as const;

export function formatDate(value: Date | string, formatKey: keyof typeof FORMATS = 'DATE_TIME'): string {
  const date = dayjs(value);

  if (!date.isValid()) return '';

  const format = FORMATS[formatKey];

  return date.format(format);
}

export function getToday(): Date {
  return dayjs().toDate();
}

export function getMonthOfDate(date: Date = getToday()) {
  return dayjs(date).get('month') + 1;
}

export function addDate(date: Date, amount: number): Date {
  return dayjs(date).add(amount, 'd').toDate();
}

export function getStartOfWeek(date: Date = new Date()): Date {
  return dayjs(date).startOf('week').toDate();
}

export function getEndOfWeek(date: Date = new Date()): Date {
  return dayjs(date).endOf('week').toDate();
}

export function isBetween(date: string | Date, start: string | Date, end: string | Date): boolean {
  return dayjs(date).isBetween(start, dayjs(end), 'day', '[]');
}

// https://gist.github.com/leegeunhyeok/8695aaf29674b098b7da7696e90810bb
export function getWeekNumber(date = getToday()) {
  // 해당 날짜 (일)
  const currentDate = dayjs(date).get('date');

  // 이번 달 1일로 지정
  const startOfMonth = dayjs(date).startOf('month');

  // 이번 달 1일이 무슨 요일인지 확인
  const startDay = startOfMonth.get('day'); // 0: Sun ~ 6: Sat

  // ((요일 - 1) + 해당 날짜) / 7일로 나누기 = N 주차
  return Math.floor((startDay - 1 + currentDate) / 7) + 1;
}

export default {};
