const getOrdinalNumber = (input: string) => {
  const setAcronym = (acronym: string) => {
    return input[0] === '0' ? `${input[1]}${acronym}` : `${input}${acronym}`;
  }

  switch (input) {
    case '00': {
      return 'nth';
    }
    case '01': {
      return setAcronym('st');
    }
    case '02': {
      return setAcronym('nd');
    }
    case '03': {
      return setAcronym('rd');
    }
    case '21': {
      return setAcronym('st');
    }
    case '22': {
      return setAcronym('nd');
    }
    case '23': {
      return setAcronym('rd');
    }
    default:
      return setAcronym('th');
  }
}

export default getOrdinalNumber