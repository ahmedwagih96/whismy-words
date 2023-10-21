"use client";
import "../auth.css";
import { EnvelopeOpenIcon } from "@heroicons/react/24/solid";
const ForgotPassword = () => {
  return (
    <main>
      <section className="authForm__container">
        <h1 className="authForm__title">Forgot Password</h1>
        <form className="authForm">
          <div className="authForm__group">
            <label htmlFor="email" className="authForm__label">
              Email
            </label>
            <div className="input__group">
              <EnvelopeOpenIcon />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="authForm__input"
              />
            </div>
          </div>

          <button type="submit" className="authForm__btn">
            Submit
          </button>
        </form>
      </section>
    </main>
  );
};

export default ForgotPassword;
