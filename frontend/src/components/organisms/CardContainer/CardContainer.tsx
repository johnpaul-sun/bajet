import React, { ReactNode } from "react";

type CardType = {
  children: any,
  className?: string,
  textCenter?: string,
  headerClass?: string,
  header?: boolean,
  headerLeft?: ReactNode,
  headerRight?: ReactNode,
  isDark?: boolean,
  hr?: boolean
};

function Card({
  children,
  className = '',
  headerClass = '',
  textCenter = '',
  header = false,
  headerLeft = <></>,
  headerRight = <></>,
  isDark = false,
  hr = false
}: CardType) {

  const theme = isDark ? 'bg-background-dark text-light-100' : 'bg-background-light text-dark-100';

  return (
    <div className={`w-full ${theme} rounded-px-18`}>
      {header &&
        <div className={`px-px-21 rounded-t-px-18 ${theme} border-none pt-px-10 ${headerClass}`}>
          <div className={`py-px-9 flex flex-row justify-between items-center ${hr && `border-b ${isDark ? 'border-inactive' : 'border-black'}`}`}>
            {headerLeft && <div className={`text-18 font-medium ${theme} `}>{headerLeft}</div>}
            {textCenter && <h1 className="text-light-60 text-18">{textCenter}</h1>}
            {headerRight && <div className={`${theme} cursor-pointer`}>{headerRight}</div>}
          </div>
        </div>}
      <div className={`${!header ? 'rounded-px-18' : 'rounded-b-px-18'} pt-px-12 pb-px-24 px-px-21 ${theme} ${className}`}>
        {children}
      </div>
    </div>
  );
}

export default Card;
