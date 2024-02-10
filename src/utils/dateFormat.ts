import { DateTime } from 'luxon'

export function toTimeFormat(d: Date): string {
  return DateTime.fromJSDate(d).toFormat('T')
}

export function toDateTimeFormat(d: Date): string {
  return DateTime.fromJSDate(d).toFormat('yyyy-MM-dd HH:mm')
}

export function toDateFormat(d: Date): string {
  return DateTime.fromJSDate(d).toFormat('yyyy-MM-dd')
}
