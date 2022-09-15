/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { userAPI } from "src/api/useAPI";
import Button from "src/components/molecules/Button/Button";
import Card from "src/components/organisms/CardModal/CardModal";
import style from "src/utils/styles";
import Loading from "src/pages/public/Loading/Loading";
import { InputTypes, PreventDefault } from "../Register/Register";
import AlertModal from "src/components/organisms/AlertModal/AlertModal";

type UserCredentialTypes = {
  email?: string,
  password?: string,
  password_confirmation?: string,
}

type ErrorTypes = {
  isLoading: boolean,
  isError: {
    password: any,
    email: string,
    both: string
  }
}

function ForgotPassword() {
  const navigate = useNavigate();
  const [resend, setResend] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [userCredential, setUserCredential] = useState<UserCredentialTypes>({
    email: '',
    password: '',
    password_confirmation: ''
  });

  const [getParams, setGetParams] = useSearchParams();
  const tokenParam = getParams.get('token');
  const emailParam = getParams.get('email');

  const [errors, setErrors] = useState<ErrorTypes>({
    isLoading: false,
    isError: {
      password: '',
      email: '',
      both: ''
    },
  });
  const { isLoading, isError: { password, email, both } } = errors;
  const emailError = email && <span className={style.inputError}>{email}</span>;
  const passwordError = password && password.map((message: string) => <span className={style.inputError} key={message}>{message}</span>);
  const bothError = both && <span className={style.inputError}>{both}</span>;
  const alertModal = <AlertModal text={"Success! you can now login."} type={"success"} path="/" />;

  useEffect(() => {
    tokenParam && setIsVerified(true);
  }, [])

  const startTimer = () => {
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

  let [timerCount, setTimerCount] = useState<number>(60);
  const handleSubmit = (): void => {
    setErrors({ ...errors, isLoading: true })

    userAPI.forgotPassword({ email: userCredential.email })
      .then((res) => {
        setErrors({ isLoading: false, isError: { password: '', email: '', both: '' } })
        setResend(true);
        startTimer();
      })
      .catch((err) => {
        setErrors({ isLoading: false, isError: err.response.data.errors })
      })
  }

  const handleOnChange = (e: InputTypes): void => {
    setUserCredential((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  const onPasswordChange = (e: PreventDefault): void => {
    e.preventDefault();
    setErrors({ ...errors, isLoading: true })

    userAPI.inputNewPassword({
      email: emailParam,
      token: tokenParam,
      password: userCredential.password,
      password_confirmation: userCredential.password_confirmation
    })
      .then((res) => {
        setErrors({ isLoading: false, isError: { password: '', email: '', both: '' } });
        setIsSuccess(true);
      })
      .catch((err) => {
        setErrors({ isLoading: false, isError: err.response.data.errors ?? { both: err.response.data.message } });
      })
  }

  return (
    <>
      {isLoading && <Loading />}
      {isSuccess ? alertModal :
        <div className={`h-screen ${style.body.default} z-10`}>
          <Card
            header={true}
            headerText="Forgot password"
            headerCloseButton={true}
            opacity={0}
            className="z-10"
            onClickHeader={() => navigate('/')}
          >
            <div className="flex flex-col gap-5 z-10">
              <h1 className={`${style.font.dark18} text-15`}>
                {isVerified ? 'Please enter your new password' : 'Enter the email address associated with your account.'}
                <span className="flex justify-center">{bothError}</span>
              </h1>
              <div className='flex flex-col gap-5'>
                {
                  isVerified
                    ?
                    <>
                      <div className={style.position.startCenter}>
                        <label htmlFor="password" className={style.font.dark18}>Password</label>
                        <input placeholder="●●●●●●●●●" type="password" name="password" className={`${style.input.password} ${password && style.input.borderError}`} onChange={handleOnChange} />
                        {passwordError}
                      </div>
                      <div className={style.position.startCenter}>
                        <label htmlFor="confirm-password" className={style.font.dark18}>Confirm Password</label>
                        <input placeholder="●●●●●●●●●" type="password" name="password_confirmation" className={`${style.input.password} ${password && style.input.borderError}`} onChange={handleOnChange} />
                        {passwordError}
                      </div>
                    </>
                    :
                    <div className={style.position.startCenter}>
                      <label htmlFor="email" className={style.font.dark18}>Email</label>
                      <input placeholder="johndoe@email.com" type="email" name="email" className={`${style.input.text} ${email && style.input.borderError}`} onChange={handleOnChange} />
                      {emailError}
                    </div>
                }
                {resend && <p className={`${style.font.dark12} text-primary-100`}>A verification link has been sent to the email address you provided.</p>}
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-px-40">
              {isVerified
                ?
                <Button
                  type="primary"
                  onClick={(e) => onPasswordChange(e)}
                  text="Continue"
                />
                :
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  text={resend ? `Resend after ${timerCount} seconds` : "Reset Password"}
                  disabled={resend}
                />}
            </div>
          </Card>
        </div>}
    </>
  );
}

export default ForgotPassword;
