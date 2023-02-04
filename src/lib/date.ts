import dayjs from 'dayjs';
import ko from 'dayjs/locale/ko';
import isBetweenPlugin from 'dayjs/plugin/isBetween';

dayjs.extend(isBetweenPlugin);

// https://github.com/iamkun/dayjs/issues/215#issuecomment-471280396
dayjs.locale({
  ...ko,
  weekStart: 1,
});

export const FORMAT = 'YYYY.MM.DD HH:mm:ss';

export function formatDate(value: Date | string, format: string = FORMAT): string {
  const date = dayjs(value);

  if (!date.isValid()) return '';

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
  const sunday = dayjs(date).startOf('week').toDate();

  // 월요일을 한 주의 시작으로 계산
  return addDate(sunday, 1);
}

export function getEndOfWeek(date: Date = new Date()): Date {
  const saturday = dayjs(date).endOf('week').toDate();

  // 일요일을 한 주의 마지막으로 계산
  return addDate(saturday, 1);
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

console.log('getStartOfWeek', getStartOfWeek());

export default {};
