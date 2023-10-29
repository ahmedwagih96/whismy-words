"use client";
import useResetPassword from "@/hooks/useResetPassword";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { LoadingIcon } from "..";
function ResetPasswordForm() {
  const { resetPasswordHandler, resetPasswordForm, handleChange, loading } =
    useResetPassword();
  return (
    <form onSubmit={(e) => resetPasswordHandler(e)} className="authForm">
      <div className="authForm__group">
        <label htmlFor="password" className="authForm__label">
          Password
        </label>
        <div className="input__group">
          <LockClosedIcon />
          <input
            onChange={handleChange}
            name="password"
            value={resetPasswordForm.password}
            type="password"
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
            onChange={handleChange}
            name="verifyPassword"
            value={resetPasswordForm.verifyPassword}
            type="password"
            placeholder="Re-enter  password"
            className="authForm__input"
          />
        </div>
      </div>

      <button type="submit" disabled={loading} className="authForm__btn">
        {loading ? <LoadingIcon /> : "Submit"}
      </button>
    </form>
  );
}

export default ResetPasswordForm;
