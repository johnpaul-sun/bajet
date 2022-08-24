import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { userAPI } from "src/api/useAPI";
import Button from "src/components/molecules/Button/Button";
import Card from "src/components/molecules/Card/Card";
import { PreventDefault } from "src/pages/public/user/Register/Register";
import style from "src/utils/styles";

function VerifyEmail() {
  const [resend, setResend] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  let [timerCount, setTimerCount] = useState<number>(60);
  let [redirectCount, setRedirectCount] = useState<number>(3);

  const navigate = useNavigate();

  const setTimer = (millisec: number): void => {
    isVerified ? setRedirectCount(redirectCount--) : setTimerCount(timerCount--);
    const timer = setInterval((): void => {
      isVerified ? setRedirectCount(redirectCount--) : setTimerCount(timerCount--);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      isVerified || setResend(false);
      isVerified ? setRedirectCount(3) : setTimerCount(60);
      isVerified && navigate('/dashboard');
    }, millisec)
  };

  const handleClick = (e: PreventDefault): void => {
    e.preventDefault();
    setResend(true);
    setTimer(60000);

    userAPI.resendVerification().catch(() => console.clear());

  };

  const handleLogout = (): void => {
    Cookies.remove('user');
    Cookies.remove('user_token');
  };

  let ignore = false;
  const [getParams, setGetParams] = useSearchParams();
  useEffect(() => {
    if (!ignore) {
      const userID = getParams.get('user');
      const verified = getParams.get('verified');

      userID || navigate('/');
      verified && setIsVerified(true);
      verified && userAPI.getUser(Number(userID))
        .then((res) => {
          Cookies.set('user', JSON.stringify(res.data.data));
        })
        .catch((err) => {
          console.log(err);
          err.response.status == 401 && navigate('/');
        })

      isVerified && setTimer(3000);
    }
    return () => { ignore = true }

  }, [isVerified])

  return (
    <div className={`h-screen ${style.body.default}`}>
      <Card
        header={true}
        headerText="Verify email address"
        headerCloseButton={false}
        opacity={0}
      >
        <div className="flex flex-col gap-5">
          <h1 className={`${style.font.dark18} ${isVerified && 'text-center'}`}>
            {isVerified ? 'Thank you for verifying your email address!' : 'Thank you for registering!'}
          </h1>
          {isVerified || <div className={`flex flex-col gap-2 ${style.font.dark12}`}>
            <p>Please click the link we just sent you to confirm your email address before continuing. </p>
            <p>We will happily send you another email if you didn't get the first one. </p>
          </div>}
          {resend && <p className={`text-primary-100 ${style.font.dark12}`}>
            A new verification link has been sent to the email address you provided during registration.
          </p>}
          {isVerified && <p className={`text-primary-100 ${style.font.dark12}`}>
            This page will be automatically redirected to dashboard in {redirectCount}s.
          </p>}
        </div>
        <div className="flex flex-col gap-3 mt-px-40">
          {isVerified
            ? <Button
              type="primary"
              onClick={() => navigate('/dashboard')}
              text="Redirect to Dashboard"
              path="/dashboard"
            />
            : <Button
              type="primary"
              onClick={handleClick}
              text={resend ? `Resend after ${timerCount} seconds` : "Resend verification email"}
              disabled={resend}
            />}
          <Button type="primaryInvert" onClick={handleLogout} text="Logout" fontType="dark" path="/" />
        </div>
      </Card>
    </div>
  );
}

export default VerifyEmail;
