const formatNumber = (input: number | string) => {
  const isString = typeof input === 'string';

  return parseFloat(isString ? input : input?.toString()).toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}

export default formatNumber