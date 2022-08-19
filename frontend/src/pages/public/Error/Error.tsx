import React from "react";
import { Link } from "react-router-dom";
import errorBanner from 'src/assets/images/404-image.svg';
import style from "src/utils/styles";

function Error() {
  return (
    <div className={`${style.body.default} h-screen flex flex-col justify-between gap-5`} >
      <div className="flex flex-col items-center gap-5">
        <img src={errorBanner} alt="404-error-banner" />
        <span className="font-semibold text-dark-60">Oops something went wrong!</span>
      </div>
      <Link to={"/"} className={`${style.button.primary} ${style.position.deadCenter} mt-px-12 mb-px-140`}>
        Go home
      </Link>
    </div>
  );
}

export default Error;
