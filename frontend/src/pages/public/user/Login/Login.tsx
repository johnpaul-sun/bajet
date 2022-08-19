import React, { useEffect } from "react";
import logo from 'src/assets/images/logo.png';
import loginBanner from 'src/assets/images/login-banner.svg';
import googleLogo from 'src/assets/images/google-logo.png';
import { Link } from "react-router-dom";
import { resetOnTop } from 'src/utils/resetOnTop';

function Login() {

  useEffect(() => {
    resetOnTop();
  }, [])

  return (
    <div className="w-screen p-px-24 px-px-30 bg-gradient-to-b from-tertiary-30 to-sky-50">
      <img src={logo} alt="bajet-logo" className="h-px-30 absolute" />
      <div className="mb-px-40">
        <img src={loginBanner} alt="banner-image" className="h-px-225 w-full" />
        <h1 className="font-semibold text-27 text-center">Welcome back!</h1>
      </div>
      <form className="flex flex-col gap-6">
        <div className="flex flex-col items-start justify-center">
          <label htmlFor="email" className="text-dark-60 text-18 font-medium">Email</label>
          <input placeholder="johndoe@email.com" type="email" name="email" className="p-px-9 h-px-36 border-2 border-primary-60 bg-primary-10 focus:outline-primary-100 rounded-px-3 w-full" />
        </div>
        <div className="flex flex-col items-start justify-center">
          <label htmlFor="password" className="text-dark-60 text-18 font-medium">Password</label>
          <input placeholder="●●●●●●●●●" type="password" name="password" className="placeholder:text-12 p-px-9 h-px-36 border-2 border-primary-60 bg-primary-10 focus:outline-primary-100 rounded-px-3 w-full" />
        </div>
        <span className="text-12 font-medium text-dark-60 text-center">Or continue with</span>
        <button className="flex flex-row items-center justify-center h-px-42 border-2 border-secondary-60 rounded-px-3">
          <img src={googleLogo} alt="google-logo" className="w-max" />
          <span className="text-12">Google Account</span>
        </button>
        <div className="flex flex-col gap-2">
          <span className="text-12 font-medium text-dark-60 text-center">
            Don't have an account yet?&nbsp;
            <span className="text-secondary-100">
              <Link to={"/register"}>Register</Link>
            </span>
          </span>
          <span className="text-12 font-medium text-dark-60 text-center">
            Forgot password?&nbsp;
            <span className="text-secondary-100">
              <Link to={"/register"}>Reset password</Link>
            </span>
          </span>
        </div>
        <button className="bg-secondary-100 text-light-100 h-px-40 rounded-px-3 mt-px-12 mb-px-140">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login;
