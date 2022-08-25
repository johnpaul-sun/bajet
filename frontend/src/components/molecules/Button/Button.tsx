import React from "react";
import { Link } from "react-router-dom";
import style from "src/utils/styles";

type ButtonTypes = {
  type?: string,
  text: string,
  height?: string,
  disabled?: boolean,
  fontType?: string,
  onClick?: (e: any) => void,
  path?: string,
  className?: string
};

function Button({
  type = 'primary',
  text,
  height = 'large',
  disabled = false,
  fontType = 'light',
  onClick = () => { },
  path = "",
  className = ""
}: ButtonTypes) {

  const styleType: any = {
    primary: 'bg-secondary-100',
    primaryInvert: 'border-2 border-secondary-100',
    secondary: 'bg-primary-100',
    secondaryInvert: 'border-2 border-primary-100',
    success: 'bg-success-100',
    successInvert: 'border-2 border-success-60',
    error: 'bg-error-100',
    errorInvert: 'border-2 border-error-100',
  };

  return (
    <Link
      to={path}
      className={`
        rounded-px-3
        ${height === 'medium' ? 'h-px-30 text-13' : 'h-px-40 text-15'} 
        ${style.position.deadCenter} 
        ${disabled && 'opacity-50 cursor-not-allowed'}
        ${styleType[type]} 
        ${fontType === 'light' ? 'text-light-100' : 'text-dark-100'} 
        ${className}
      `}
      onClick={(e) => {
        if (disabled)
          return disabled && e.preventDefault()
        onClick(e);
      }}
    >
      {text}
    </ Link>
  )
}

export default Button;
