import React, { useState } from "react";
import Button from "src/components/molecules/Button/Button";
import Card from "src/components/molecules/Card/Card";
import style from "src/utils/styles";

function ForgotPassword() {
  const [resend, setResend] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  let [timerCount, setTimerCount] = useState<number>(60);

  const handleSubmit = (): void => {
    setResend(true);

    console.log('Send reset password link');

    setTimerCount(timerCount--);
    const timer = setInterval((): void => {
      setTimerCount(timerCount--);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      setTimerCount(60);
      setResend(false);
    }, 60000)
  }

  const onPasswordChange = (): void => {
    console.log('Change password, show pop success message, and redirect to home,');
  }

  return (
    <div className={`h-screen ${style.body.default}`}>
      <Card
        header={true}
        headerText="Forgot password"
        headerCloseButton={false}
        opacity={0}
      >
        <div className="flex flex-col gap-5">
          <h1 className={`${style.font.dark18} text-15`}>
            {isVerified ? 'Please enter your new password' : 'Enter the email address associated with your account.'}
          </h1>
          <div className='flex flex-col gap-5'>
            {
              isVerified
                ?
                <>
                  <div className={style.position.startCenter}>
                    <label htmlFor="password" className={style.font.dark18}>Password</label>
                    <input placeholder="●●●●●●●●●" type="password" name="password" className={style.input.password} />
                  </div>
                  <div className={style.position.startCenter}>
                    <label htmlFor="confirm-password" className={style.font.dark18}>Confirm Password</label>
                    <input placeholder="●●●●●●●●●" type="password" name="confirm-password" className={style.input.password} />
                  </div>
                </>
                :
                <div className={style.position.startCenter}>
                  <label htmlFor="email" className={style.font.dark18}>Email</label>
                  <input placeholder="johndoe@email.com" type="email" name="email" className={style.input.text} />
                </div>
            }
            {resend && <p className={`${style.font.dark12} text-primary-100`}>A verification link has been sent to the email address you provided.</p>}
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-px-40">
          {isVerified ? <Button
            type="primary"
            onClick={onPasswordChange}
            text="Continue"
          /> : <Button
            type="primary"
            onClick={handleSubmit}
            text={resend ? `Resend after ${timerCount} seconds` : "Reset Password"}
            disabled={resend}
          />}
        </div>
      </Card>
    </div>
  );
}

export default ForgotPassword;
