const upperCaseFirstLetter = (text: string) => {
  return text.replace(/^(.)|\s+(.)/g, (c: string) => c.toUpperCase());
}

export default upperCaseFirstLetter;