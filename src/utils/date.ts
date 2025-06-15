
import { format, parseISO, differenceInCalendarDays } from "date-fns";

export function todayStr() {
  return format(new Date(), "yyyy-MM-dd");
}

export function isToday(iso: string) {
  return differenceInCalendarDays(parseISO(iso), new Date()) === 0;
}
