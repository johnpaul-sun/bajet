import React, { useEffect, useState } from "react";
import logo from 'src/assets/images/logo.png';
import loginBanner from 'src/assets/images/login-banner.svg';
import googleLogo from 'src/assets/images/google-logo.png';
import { Link, useNavigate } from "react-router-dom";
import resetOnTop from 'src/utils/resetOnTop';
import style from "src/utils/styles";
import { userAPI } from "src/api/useAPI";
import { InputTypes, PreventDefault } from "../Register/Register";
import Loading from "../../Loading/Loading";
import Cookies from "js-cookie";

type UserCredentialTypes = {
  email: string,
  password: string,
}

type ErrorTypes = {
  isLoading: boolean,
  isError: {
    email: string,
    password: any,
    both: string
  }
}

function Login() {
  const navigate = useNavigate();

  const [userCredential, setUserCredential] = useState<UserCredentialTypes>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<ErrorTypes>({
    isLoading: false,
    isError: {
      email: '',
      password: '',
      both: ''
    },
  });

  const { isLoading, isError: {
    email,
    password,
    both
  } } = errors;

  const emailError = email && <span className={style.inputError}>{email}</span>;
  const passwordError = password && <span className={style.inputError}>{password}</span>;
  const bothError = both && <span className={style.inputError}>{both}</span>;

  useEffect(() => {
    resetOnTop();
  }, [])

  const handleOnChange = (e: InputTypes): void => {
    setUserCredential((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = (e: PreventDefault): void => {
    e.preventDefault();
    setErrors({ ...errors, isLoading: true });

    userAPI.login(userCredential)
      .then((res) => {
        const isVerified = res.data.data.email_verified_at;
        Cookies.set('user_token', res.data.token);

        if (isVerified) {
          Cookies.set('user', JSON.stringify(res.data.data));
          navigate('/dashboard')
        }

        navigate(`/verify-email?user=${res.data.data.id}`);
      })
      .catch((err) => {
        const response = err.response.data;
        setErrors({ isError: response.errors ?? { both: response.message }, isLoading: false });
      })
  }

  return (
    <>
      {isLoading && <Loading />}
      <div className={style.body.default}>
        <img src={logo} alt="bajet-logo" className="h-px-30 absolute" />
        <div className="mb-px-40">
          <img src={loginBanner} alt="banner-image" className="h-px-225 w-full" />
          <h1 className={style.font.headerCenter}>Welcome back!</h1>
          <span className="flex justify-center">{bothError}</span>
        </div>
        <form method="POST" className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className={style.position.startCenter}>
            <label htmlFor="email" className={style.font.dark18}>Email</label>
            <input placeholder="johndoe@email.com" type="text" name="email" className={`${style.input.text} ${email && style.input.borderError}`} onChange={handleOnChange} />
            {emailError}
          </div>
          <div className={style.position.startCenter}>
            <label htmlFor="password" className={style.font.dark18}>Password</label>
            <input placeholder="●●●●●●●●●" type="password" name="password" className={`${style.input.password} ${password && style.input.borderError}`} onChange={handleOnChange} />
            {passwordError}
          </div>
          <span className={style.font.dark12Center}>Or continue with</span>
          <button className={style.button.secondary}>
            <img src={googleLogo} alt="google-logo" className="w-max" />
            <span className="text-12">Google Account</span>
          </button>
          <div className="flex flex-col gap-2">
            <span className={style.font.dark12Center}>
              Don't have an account yet?&nbsp;
              <Link to={"/register"} className="text-secondary-100">Register</Link>
            </span>
            <span className={style.font.dark12Center}>
              Forgot password?&nbsp;
              <Link to={"/forgot-password"} className="text-secondary-100">Reset password</Link>
            </span>
          </div>
          <button className={`${style.button.primary} mt-px-12 mb-px-140`}>
            Login
          </button>
        </form>
      </div>
    </>
  )
}

export default Login;
