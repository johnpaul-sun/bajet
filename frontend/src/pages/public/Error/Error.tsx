import React from "react";
import { Link } from "react-router-dom";
import errorBanner from 'src/assets/images/404-image.svg';

function Error() {
  return (
    <div className="w-screen h-screen p-px-24 px-px-30 bg-gradient-to-b from-tertiary-30 to-sky-50 overflow-x-hidden flex flex-col justify-between gap-5">
      <div className="flex flex-col items-center gap-5">
        <img src={errorBanner} alt="404-error-banner" />
        <span className="font-semibold text-dark-60">Oops something went wrong!</span>
      </div>
      <Link to={"/"} className="bg-secondary-100 text-light-100 h-px-40 rounded-px-3 mt-px-12 mb-px-90 flex items-center justify-center">
        Go home
      </Link>
    </div>
  );
}

export default Error;
