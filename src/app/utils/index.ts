export function money(value: number, currency: string = "PHP") {
  value = Number(value)
  return currency + ' ' + value.toLocaleString('en-us', {
    minimumFractionDigits: 2,
    currency: currency
  })
}