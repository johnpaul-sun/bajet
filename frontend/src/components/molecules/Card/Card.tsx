import React from "react";
import Header from "../Header/Header";

type CardTypes = {
  children: any,
  className?: string,
  header?: boolean,
  headerCloseButton?: boolean,
  headerText?: string,
  onClick: () => void
};

function Card({
  children,
  className = '',
  header = false,
  headerCloseButton = true,
  headerText = 'Header Text',
  onClick
}: CardTypes) {
  return (
    <div className="w-screen absolute top-0 left-0 h-screen z-10 flex flex-col items-center justify-center p-px-30">
      <div className="shadow-lg z-30 w-full">
        {header && <Header text={headerText} headerCloseButton={headerCloseButton} onClick={onClick} />}
        <div className={`${!header ? 'rounded-px-18' : 'rounded-b-px-18'} p-px-18 bg-background-light ${className}`}>
          {children}
        </div>
      </div>
      <div className="bg-background-overlay h-screen w-screen absolute z-20 opacity-60" onClick={onClick}></div>
    </div>
  );
}

export default Card;
