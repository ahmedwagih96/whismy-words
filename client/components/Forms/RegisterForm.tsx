"use client";
import { EnvelopeOpenIcon, UserCircleIcon, LockClosedIcon } from "@heroicons/react/24/solid";
function RegisterForm() {
  return (
    <form  className="authForm">
      <div className="authForm__group">
        <label htmlFor="username" className="authForm__label">
          Username
        </label>
        <div className="input__group">
          <UserCircleIcon />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="authForm__input"
          />
        </div>
      </div>
      <div className="authForm__group">
        <label htmlFor="email" className="authForm__label">
          Email
        </label>
        <div className="input__group">
          <EnvelopeOpenIcon />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="authForm__input"
          />
        </div>
      </div>
      <div className="authForm__group">
        <label htmlFor="password" className="authForm__label">
          Password
        </label>
        <div className="input__group">
          <LockClosedIcon />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="authForm__input"
          />
        </div>
      </div>
      <div className="authForm__group">
        <label htmlFor="password" className="authForm__label">
          Confirm Password
        </label>
        <div className="input__group">
          <LockClosedIcon />
          <input
            type="password"
            name="verifyPassword"
            placeholder="Re-enter  password"
            className="authForm__input"
          />
        </div>
      </div>
      <button type="submit" className="authForm__btn">Register</button>
    </form>
  );
}

export default RegisterForm;
