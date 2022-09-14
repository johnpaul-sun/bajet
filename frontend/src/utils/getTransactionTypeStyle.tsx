const getTransactionTypeStyle = (input: string, opacity: string = "100") => {

  switch (input) {
    case 'income': {
      return `text-success-100 opacity-${opacity}`;
    }
    case 'expense': {
      return `text-error-100 opacity-${opacity}`;
    }
    case 'update': {
      return `text-fail-100 opacity-${opacity}`;
    }
    case 'transfer': {
      return `text-secondary-100 opacity-${opacity}`;
    }
    default:
      return `text-success-100 opacity-${opacity}`;
  }
}

export default getTransactionTypeStyle