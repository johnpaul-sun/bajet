const style = {
  body: {
    default: ' p-px-15 bg-gradient-to-b from-tertiary-30 to-sky-50 overflow-x-hidden',
  },
  position: {
    deadCenter: 'flex items-center justify-center',
    start: 'flex flex-col items-start justify-start',
    startCenter: 'flex flex-col items-start justify-center',
    xColCenter: 'flex flex-col items-center',
    yColCenter: 'flex flex-col justify-center',
    xRowCenter: 'flex flex-row items-center',
    yRowCenter: 'flex flex-row justify-center',
  },
  font: {
    dark12: 'text-12 font-medium text-dark-60',
    dark12Center: 'text-12 font-medium text-dark-60 text-center',
    dark18: 'text-dark-60 text-18 font-medium',
    headerCenter: 'font-semibold text-27 text-center',
  },
  input: {
    text: 'p-px-9 h-px-36 border-2 border-primary-60 bg-primary-10 focus:outline-primary-100 rounded-px-3 w-full',
    password: 'placeholder:text-12 p-px-9 h-px-36 border-2 border-primary-60 bg-primary-10 focus:outline-primary-100 rounded-px-3 w-full',
    borderError: 'border-error-100',
  },
  inputError: 'text-12 text-error-100',
  button: {
    primary: 'flex flex-row items-center justify-center bg-secondary-100 text-light-100 h-px-40 rounded-px-3 w-full',
    secondary: 'flex flex-row items-center justify-center h-px-40 border-2 border-secondary-60 rounded-px-3 w-full',
  },
}

export default style
