const toDecimal = (percent: number) => {
  return parseFloat(percent.toString() + '%') / 100
}

export { toDecimal }
