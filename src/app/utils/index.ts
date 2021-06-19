export function money(value: number, currency: string = "PHP") {
  return currency + ' ' + value.toLocaleString('en-us', {
    minimumFractionDigits: 2,
    currency: currency
  })
}