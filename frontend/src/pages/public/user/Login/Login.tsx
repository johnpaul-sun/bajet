import React, { useEffect } from "react";
import logo from 'src/assets/images/logo.png';
import loginBanner from 'src/assets/images/login-banner.svg';
import googleLogo from 'src/assets/images/google-logo.png';
import { Link } from "react-router-dom";
import { resetOnTop } from 'src/utils/resetOnTop';
import style from "src/utils/styles";

function Login() {

  useEffect(() => {
    resetOnTop();
  }, [])

  return (
    <div className={style.body.default}>
      <img src={logo} alt="bajet-logo" className="h-px-30 absolute" />
      <div className="mb-px-40">
        <img src={loginBanner} alt="banner-image" className="h-px-225 w-full" />
        <h1 className={style.font.headerCenter}>Welcome back!</h1>
      </div>
      <form className="flex flex-col gap-6">
        <div className={style.position.startCenter}>
          <label htmlFor="email" className={style.font.dark18}>Email</label>
          <input placeholder="johndoe@email.com" type="email" name="email" className={style.input.text} />
        </div>
        <div className={style.position.startCenter}>
          <label htmlFor="password" className={style.font.dark18}>Password</label>
          <input placeholder="●●●●●●●●●" type="password" name="password" className={style.input.password} />
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
            <Link to={"/register"} className="text-secondary-100">Reset password</Link>
          </span>
        </div>
        <button className={`${style.button.primary} mt-px-12 mb-px-140`}>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login;
