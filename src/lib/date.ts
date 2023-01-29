import dayjs from 'dayjs';

export const formatDate = function formatDate(value: any, format: string) {
  const date = dayjs(value);

  if (!date.isValid()) return '';

  return date.format(format);
};

export default {};
