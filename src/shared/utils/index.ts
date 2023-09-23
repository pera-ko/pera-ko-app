export function money(value: number, currency: string = "PHP") {
  value = Number(value)
  return currency + ' ' + value.toLocaleString('en-us', {
    minimumFractionDigits: 2,
    currency: currency
  })
}

export function formatCurrency(value: number) {
  value = Number(value)
  return value.toLocaleString('en-us', {
    minimumFractionDigits: 2
  })
}

export function hexToRGB(hex: string, alpha: number) {
  var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}