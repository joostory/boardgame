
const numberFormatObj = new Intl.NumberFormat()

export function toNumberFormat(n: number): string {
  return numberFormatObj.format(n)
}
