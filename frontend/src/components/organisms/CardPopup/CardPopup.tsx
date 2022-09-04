import React from "react";
import Header from "../../molecules/Header/Header";

type CardTypes = {
  children: any,
  className?: string,
  header?: boolean,
  headerCloseButton?: boolean,
  headerText?: string,
  opacity?: number,
  closeModal?: () => void,
  onClickHeader?: () => void
};

function Card({
  children,
  className = '',
  header = false,
  headerCloseButton = true,
  headerText = 'Header Text',
  opacity = .6,
  closeModal = () => { },
  onClickHeader = () => { }
}: CardTypes) {
  return (
    <div className="w-screen top-0 left-0 h-screen z-10 flex flex-col justify-center items-center p-px-30 fixed overflow-scroll">
      <div className="shadow-lg z-30 w-full overflow-scroll rounded-px-18">
        {header && <Header text={headerText} headerCloseButton={headerCloseButton} onClick={onClickHeader} />}
        <div className={`${!header ? 'rounded-px-18' : 'rounded-b-px-18'} p-px-30 bg-background-light shadow-modal ${className}`}>
          {children}
        </div>
      </div>
      <div className="bg-background-overlay h-screen w-screen fixed z-20 top-0 left-0" onClick={closeModal} style={{ opacity }}></div>
    </div>
  );
}

export default Card;
