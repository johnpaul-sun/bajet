import React from "react";
import success from 'src/assets/images/check.png'
import error from 'src/assets/images/error.png'
import failed from 'src/assets/images/failed.png'

type NotificationTypes = {
  onClick: () => void,
  status: string,
  message?: string,
}

function Notification({ onClick, status, message = '' }: NotificationTypes) {
  const state: any = {
    success: 'bg-success-100 text-light-100',
    error: 'bg-error-100 text-light-100',
    failed: 'bg-fail-100 text-dark-60',
  }

  const image: any = {
    success,
    error,
    failed,
  }

  const text: any = {
    success: 'Success!',
    error: 'Error!',
    failed: 'Failed!',
  }

  return (
    <div className={`absolute w-11/12 top-5 left-4 flex flex-row justify-between items-center rounded-px-12 py-px-6 px-px-18 shadow-modal ${state[status]}`}>
      <img src={image[status]} alt="success" className="h-px-18 w-px-18" />
      {message ? message : text[status]}
      <div className="h-px-18 w-px-18"></div>
    </div>
  );
}

export default Notification;
