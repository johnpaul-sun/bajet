import React from "react";
import BackToTopIcon from 'src/assets/images/back-to-top.png';
import resetOnTop from "src/utils/resetOnTop";

function BackToTop() {
  return (
    <div className="flex justify-end items-end fixed bottom-4 right-4 opacity-60 cursor-pointer hover:opacity-100" onClick={resetOnTop}>
      <img src={BackToTopIcon} alt="Top" className="w-px-40" />
    </div>
  );
}

export default BackToTop;
