import "../auth.css";
import { LoginForm } from "@/components";
import Link from "next/link";
const Login = async () => {
  return (
    <main>
      <section className="authForm__container">
        <h1 className="authForm__title">Login to your account</h1>
        <LoginForm />
        <div className="authForm__link">
          Don't have an account? <Link href="/auth/register">Register Now</Link>
        </div>
      </section>
    </main>
  );
};

export default Login;
