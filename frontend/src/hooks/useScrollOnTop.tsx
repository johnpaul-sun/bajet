/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

const useScrollOnTop = (YOffset: number) => {
  const [backToTop, setBackToTop] = useState<boolean>(false);

  useEffect(() => {
    addEventListener('scroll', () => {
      if (window.pageYOffset > YOffset) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    })
  }, [backToTop])

  return { backToTop };
}

export default useScrollOnTop;
