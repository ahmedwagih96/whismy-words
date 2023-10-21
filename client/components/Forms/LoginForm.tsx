"use client";
import useAuthentication from "@/hooks/useAuthentication";
import { EnvelopeOpenIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
function LoginForm() {
  const { loginHandler, authForm, loading, handleAuthForm } =
    useAuthentication();
  return (
    <form className="authForm" onSubmit={loginHandler}>
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
            placeholder="Email"
            className="authForm__input"
            name="email"
          />
        </div>
      </div>
      <div className="authForm__group">
        <label htmlFor="email" className="authForm__label">
          Password
        </label>
        <div className="input__group">
          <LockClosedIcon />
          <input
            value={authForm.password}
            onChange={handleAuthForm}
            type="password"
            name="password"
            placeholder="Password"
            className="authForm__input"
          />
        </div>
      </div>
      <div className="authForm__link">
        <Link href="/auth/forgot-password">Forgot Password?</Link>
      </div>
      <button type="submit" className="authForm__btn" disabled={loading}>
        {loading ? "Login in..." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;
