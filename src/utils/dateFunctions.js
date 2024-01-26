import { DateTime } from 'luxon';

export function formatMonthDay(dateString) {
  const parsedDate = DateTime.fromISO(dateString);
  return parsedDate.toFormat('LLLL dd');
}
