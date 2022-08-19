import React, { useEffect } from "react";
import logo from 'src/assets/images/logo.png';
import registerBanner from 'src/assets/images/register-banner.svg';
import googleLogo from 'src/assets/images/google-logo.png';
import { Link } from "react-router-dom";
import { resetOnTop } from "src/utils/resetOnTop";
import style from 'src/utils/styles';

function Register() {

  useEffect(() => {
    resetOnTop();
  }, [])

  return (
    <div className={style.body.default}>
      <img src={logo} alt="bajet-logo" className="h-px-30 absolute" />
      <div className="mb-px-40">
        <img src={registerBanner} alt="banner-image" className="h-px-225 w-full" />
        <h1 className={style.font.headerCenter}>Manage your finances</h1>
      </div>
      <form className="flex flex-col gap-6">
        <div className="flex gap-3">
          <div className={style.position.startCenter}>
            <label htmlFor="firstName" className={style.font.dark18}>First name</label>
            <input placeholder="John" type="text" name="firstName" className={style.input.text} />
          </div>
          <div className={style.position.startCenter}>
            <label htmlFor="lastName" className={style.font.dark18}>Last name</label>
            <input placeholder="Doe" type="text" name="lastName" className={style.input.text} />
          </div>
        </div>
        <div className={style.position.startCenter}>
          <label htmlFor="email" className={style.font.dark18}>Email</label>
          <input placeholder="johndoe@email.com" type="email" name="email" className={style.input.text} />
        </div>
        <div className={style.position.startCenter}>
          <label htmlFor="password" className={style.font.dark18}>Password</label>
          <input placeholder="●●●●●●●●●" type="password" name="password" className={style.input.password} />
        </div>
        <div className={style.position.startCenter}>
          <label htmlFor="confirm-password" className={style.font.dark18}>Confirm Password</label>
          <input placeholder="●●●●●●●●●" type="password" name="confirm-password" className={style.input.password} />
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
  )
}

export default Register;
