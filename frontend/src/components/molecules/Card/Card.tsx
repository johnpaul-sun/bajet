import React from "react";
import Header from "../Header/Header";

type CardTypes = {
  children: any,
  className?: string,
  header?: boolean,
  headerCloseButton?: boolean,
  headerText?: string,
  opacity?: number,
  onClick?: () => void
};

function Card({
  children,
  className = '',
  header = false,
  headerCloseButton = true,
  headerText = 'Header Text',
  opacity = .6,
  onClick = () => { }
}: CardTypes) {
  return (
    <div className="w-screen absolute top-0 left-0 h-screen z-10 flex flex-col items-center justify-center p-px-30">
      <div className="shadow-lg z-30 w-full">
        {header && <Header text={headerText} headerCloseButton={headerCloseButton} onClick={onClick} />}
        <div className={`${!header ? 'rounded-px-18' : 'rounded-b-px-18'} p-px-30 bg-background-light shadow-modal ${className}`}>
          {children}
        </div>
      </div>
      <div className={`bg-background-overlay h-screen w-screen absolute z-20`} onClick={onClick} style={{ opacity }}></div>
    </div>
  );
}

export default Card;
