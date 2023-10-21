"use client";
import useAuthentication from "@/hooks/useAuthentication";
import {
  EnvelopeOpenIcon,
  UserCircleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
function RegisterForm() {
  const { registerHandler, authForm, loading, handleAuthForm } =
    useAuthentication();
  return (
    <form className="authForm" onSubmit={registerHandler}>
      <div className="authForm__group">
        <label htmlFor="username" className="authForm__label">
          Username
        </label>
        <div className="input__group">
          <UserCircleIcon />
          <input
            onChange={handleAuthForm}
            value={authForm.username}
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
            onChange={handleAuthForm}
            value={authForm.email}
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
            onChange={handleAuthForm}
            value={authForm.password}
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
            onChange={handleAuthForm}
            value={authForm.verifyPassword}
            type="password"
            name="verifyPassword"
            placeholder="Re-enter  password"
            className="authForm__input"
          />
        </div>
      </div>
      <button disabled={loading} type="submit" className="authForm__btn">
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}

export default RegisterForm;
