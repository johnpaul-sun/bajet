const getTransactionTypeStyle = (input: string, opacity: string = "100") => {

  switch (input) {
    case 'income': {
      return `text-success-${opacity}`;
    }
    case 'expense': {
      return `text-error-${opacity}`;
    }
    case 'update': {
      return `text-fail-${opacity}`;
    }
    case 'transfer': {
      return `text-secondary-${opacity}`;
    }
    default:
      return `text-success-${opacity}`;
  }
}

export default getTransactionTypeStyle