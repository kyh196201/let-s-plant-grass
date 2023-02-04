import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';

dayjs.extend(isBetweenPlugin);

export const FORMAT = 'YYYY.MM.DD HH:mm:ss';

export function formatDate(value: Date | string, format: string = FORMAT): string {
  const date = dayjs(value);

  if (!date.isValid()) return '';

  return date.format(format);
}

export function getToday(): Date {
  return dayjs().toDate();
}

export function addDate(date: Date, amount: number): Date {
  return dayjs(date).add(amount, 'd').toDate();
}

export function getMonday(date: Date = new Date()): Date {
  const sunday = dayjs(date).startOf('week').toDate();

  return addDate(sunday, 1);
}

export function getSunday(date: Date = new Date()): Date {
  const saturday = dayjs(date).endOf('week').toDate();

  return addDate(saturday, 1);
}

export function isBetween(date: string | Date, start: string | Date, end: string | Date): boolean {
  return dayjs(date).isBetween(start, dayjs(end), 'day', '[]');
}

export default {};
