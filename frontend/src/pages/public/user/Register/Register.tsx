import React, { useEffect, useState } from "react";
import logo from 'src/assets/images/logo.png';
import registerBanner from 'src/assets/images/register-banner.svg';
import googleLogo from 'src/assets/images/google-logo.png';
import { Link, useNavigate } from "react-router-dom";
import resetOnTop from "src/utils/resetOnTop";
import style from 'src/utils/styles';
import { userAPI } from "src/api/useAPI";
import Loading from "src/pages/public/Loading";
import Cookies from "js-cookie";

type UserCredentialType = {
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  password_confirmation: string
}

type ErrorType = {
  isLoading: boolean,
  isError: {
    email: string,
    first_name: string,
    last_name: string,
    password: any,
  }
}

export type InputType = {
  target: {
    name: string,
    value: string,
  }
}

export type PreventDefault = { preventDefault: () => void }

function Register() {
  const navigate = useNavigate();

  const [userCredential, setUserCredential] = useState<UserCredentialType>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState<ErrorType>({
    isLoading: false,
    isError: {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
    },
  });

  const { isLoading, isError: {
    email,
    first_name,
    last_name,
    password
  } } = errors;

  const firstNameError = first_name && <span className={style.inputError}>{first_name}</span>;
  const lastNameError = last_name && <span className={style.inputError}>{last_name}</span>;
  const emailError = email && <span className={style.inputError}>{email}</span>;
  const passwordError = password && password.map((message: string) => <span className={style.inputError} key={message}>{message}</span>);

  useEffect(() => {
    resetOnTop();
  }, [])

  const handleOnChange = (e: InputType): void => {
    setUserCredential((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  const handeSubmit = (e: { preventDefault: () => void; }): void => {
    e.preventDefault();
    setErrors({ ...errors, isLoading: true });

    userAPI.register(userCredential)
      .then((res) => {
        Cookies.set('user_token', res.data.token)
        setUserCredential({
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          password_confirmation: ''
        });
        setErrors({ ...errors, isLoading: false });
        navigate(`/verify-email?user=${res.data.user_id}`)
      })
      .catch((err) => {
        setErrors({ isError: err.response.data.errors, isLoading: false });
      })
  }

  return (
    <>
      {isLoading && <Loading />}
      <div className={style.body.default}>
        <img src={logo} alt="bajet-logo" className="h-px-30 absolute" />
        <div className="mb-px-40">
          <img src={registerBanner} alt="banner-image" className="h-px-225 w-full" />
          <h1 className={style.font.headerCenter}>Manage your finances</h1>
        </div>
        <form method="POST" className="flex flex-col gap-6" onSubmit={handeSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div className={style.position.start}>
              <label htmlFor="firstName" className={style.font.dark18}>First name</label>
              <input placeholder="John" value={userCredential.first_name} type="text" name="first_name" className={`${style.input.text} ${first_name && style.input.borderError}`} onChange={handleOnChange} />
              {firstNameError}
            </div>
            <div className={style.position.start}>
              <label htmlFor="lastName" className={style.font.dark18}>Last name</label>
              <input placeholder="Doe" value={userCredential.last_name} type="text" name="last_name" className={`${style.input.text} ${last_name && style.input.borderError}`} onChange={handleOnChange} />
              {lastNameError}
            </div>
          </div>
          <div className={style.position.start}>
            <label htmlFor="email" className={style.font.dark18}>Email</label>
            <input placeholder="johndoe@email.com" value={userCredential.email} type="text" name="email" className={`${style.input.text} ${email && style.input.borderError}`} onChange={handleOnChange} />
            {emailError}
          </div>
          <div className={style.position.start}>
            <label htmlFor="password" className={style.font.dark18}>Password</label>
            <input placeholder="●●●●●●●●●" value={userCredential.password} type="password" name="password" className={`${style.input.password} ${password && style.input.borderError}`} onChange={handleOnChange} />
            {passwordError}
          </div>
          <div className={style.position.start}>
            <label htmlFor="confirm-password" className={style.font.dark18}>Confirm Password</label>
            <input placeholder="●●●●●●●●●" value={userCredential.password_confirmation} type="password" name="password_confirmation" className={`${style.input.password} ${password && style.input.borderError}`} onChange={handleOnChange} />
            {passwordError}
          </div>
          <span className={style.font.dark12Center}>Or continue with</span>
          <button className={style.button.secondary}>
            <img src={googleLogo} alt="google-logo" className="w-max" />
            <span className="text-12">Google Account</span>
          </button>
          <span className={style.font.dark12Center}>
            Already have an account?&nbsp;
            <Link to={"/login"} className="text-secondary-100">Login</Link>
          </span>
          <button className={`${style.button.primary} mt-px-12 mb-px-140`}>
            Sign up
          </button>
        </form>
      </div>
    </>
  )
}

export default Register;
