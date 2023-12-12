import { DateTime } from 'luxon'

export function toTimeFormat(d: Date): string {
  return DateTime.fromJSDate(d).toFormat('T')
}
