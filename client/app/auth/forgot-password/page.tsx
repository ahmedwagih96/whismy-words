"use client";
import "../auth.css";
import { EnvelopeOpenIcon } from "@heroicons/react/24/solid";
import useResetPassword from "@/hooks/useResetPassword";
import { LoadingIcon } from "@/components";
const ForgotPassword = () => {
  const { resetPasswordForm, forgotPasswordHandler, loading, handleChange } =
    useResetPassword();
  return (
    <main>
      <section className="authForm__container" onSubmit={forgotPasswordHandler}>
        <h1 className="authForm__title">Forgot Password</h1>
        <form className="authForm">
          <div className="authForm__group">
            <label htmlFor="email" className="authForm__label">
              Email
            </label>
            <div className="input__group">
              <EnvelopeOpenIcon />
              <input
                value={resetPasswordForm.email}
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="Email"
                className="authForm__input"
              />
            </div>
          </div>

          <button disabled={loading} type="submit" className="authForm__btn">
            {loading ? <LoadingIcon /> : "Submit"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default ForgotPassword;
