import React from "react";
import style from "src/utils/styles";
import moduleStyle from './Loading.module.css';

function Loading() {
  return (
    <div className={`h-screen w-screen ${style.position.deadCenter} fixed bg-transparent z-30`} >
      <div className={`${moduleStyle.ldsRipple} z-60`}><div></div><div></div></div>
      <div className={`bg-background-overlay h-screen w-screen absolute z-40 opacity-30`}></div>
    </div>
  );
}

export default Loading;
