const getOrdinalNumber = (input: string) => {
  const setAcronym = (acronym: string) => {
    return input[0] === '0' ? `${input[1]}${acronym}` : `${input}${acronym}`;
  }

  switch (input[1]) {
    case '0': {
      return 'nth';
    }
    case '1': {
      return setAcronym('st');
    }
    case '2': {
      return setAcronym('nd');
    }
    case '3': {
      return setAcronym('rd');
    }
    default:
      return setAcronym('th');
  }
}

export default getOrdinalNumber