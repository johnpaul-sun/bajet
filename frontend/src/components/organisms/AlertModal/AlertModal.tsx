import React from "react";
import Button from "src/components/molecules/Button/Button";
import Card from "src/components/organisms/CardPopup/CardPopup";
import success from "src/assets/images/check.png";
import error from "src/assets/images/error.png";
import failed from "src/assets/images/failed.png";

type AlertModalTypes = {
  text: string,
  type: string,
  onClick?: () => void,
  path: string
}

function AlertModal({ text, type, onClick, path }: AlertModalTypes) {

  const alert: any = {
    success,
    error,
    failed,
  }

  return (
    <Card closeModal={onClick}>
      <div className="py-px-12 flex flex-col justify-between h-px-250 z-50">
        <div className="flex flex-col items-center justify-center gap-3">
          <img src={alert[type]} alt="status-icon" className="h-px-100 w-px-100" />
          <h1 className="font-semibold text-18 text-dark-30">{text}</h1>
        </div>
        <Button path={path} text="Continue" onClick={onClick} />
      </div>
    </Card>
  );
}

export default AlertModal;
