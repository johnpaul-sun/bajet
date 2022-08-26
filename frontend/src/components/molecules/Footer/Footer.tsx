import React from "react";
import Quotes from "src/config/quotes.json";

function Footer() {
  const randomNum = Math.floor(Math.random() * 201);
  const randomQuotes = Quotes[randomNum];

  return (
    <div>
      <p className="text-14 text-inactive px-px-15 text-center mt-px-60 mb-px-100">{randomQuotes}</p>
      <p className="text-14 text-inactive px-px-15 text-center mb-px-40">ImPaulinTech &copy; 2022</p>
    </div>
  );
}

export default Footer;
