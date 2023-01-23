export function diffInhours(dt2, dt1) {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60;
  return Math.abs(Math.round(diff));
}

export function generateFullWeekFromMonday(date) {
  const week = [];
  const monday = new Date(date);
  while (monday.getDay() !== 0) {
    week.push(new Date(monday));
    monday.setDate(monday.getDate() + 1);
  }
  week.push(new Date(monday));
  return week;
}

export function dateAddDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
