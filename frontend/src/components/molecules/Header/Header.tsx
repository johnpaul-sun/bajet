import React from "react";
import logo from 'src/assets/images/logo.png';
import closeIcon from 'src/assets/images/close-light.png';

type HeaderTypes = {
  text: string,
  headerCloseButton?: boolean,
  onClick: () => void
}

function Header({ text, headerCloseButton = false, onClick }: HeaderTypes) {
  return (
    <div className="rounded-t-px-18 bg-background-dark text-light-60 py-px-9 px-px-21 text-18 flex flex-row justify-between">
      <img src={logo} alt="icon" className="h-px-30 w-px-30" />
      {text}
      {
        headerCloseButton
          ? <img src={closeIcon} alt="close" className="h-px-30 w-px-30 cursor-pointer" onClick={onClick} />
          : <div className="h-px-30 w-px-30"></div>
      }
    </div>
  );
}

export default Header;
