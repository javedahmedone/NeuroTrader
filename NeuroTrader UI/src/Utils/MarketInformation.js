// checkMarketHours.js
import { DateTime } from "luxon";


export function checkMarketHours(utcTime) {
  // Convert UTC -> IST
  const istTime = DateTime.fromISO(utcTime).setZone("Asia/Kolkata");

  const day = istTime.weekday; // 1=Mon ... 7=Sun
  const currentMinutes = istTime.hour * 60 + istTime.minute;

  const marketOpenMinutes = 9 * 60 + 15;   // 09:15
  const marketCloseMinutes = 15 * 60 + 30; // 15:30

  const open =
    day >= 1 &&
    day <= 5 &&
    currentMinutes >= marketOpenMinutes &&
    currentMinutes <= marketCloseMinutes;

  return open;
}
