import React, { useEffect, useState } from "react";
import Quotes from "src/config/quotes.json";

function Footer() {
  const [randomNum, setRandomNum] = useState<number>(0);

  useEffect(() => {
    setRandomNum(Math.floor(Math.random() * 201));
  }, [])

  return (
    <div>
      <p className="text-14 text-inactive px-px-15 text-center mt-px-60 mb-px-100">{Quotes[randomNum]}</p>
      <p className="text-14 text-inactive px-px-15 text-center mb-px-40">ImPaulinTech &copy; 2022</p>
    </div>
  );
}

export default Footer;
