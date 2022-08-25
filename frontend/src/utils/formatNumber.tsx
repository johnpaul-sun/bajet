const formatNumber = (input: number) => {
  return parseFloat((input).toString()).toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}

export default formatNumber