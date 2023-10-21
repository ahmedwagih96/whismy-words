import "../auth.css"
import Link from "next/link";
import { RegisterForm } from "@/components";
const Register = async () => {
  return (
    <main>
      <section className="authForm__container">
        <h1 className="authForm__title">Create new account</h1>
        <RegisterForm />
        <div className="authForm__link">
          Already have an account? <Link href="/auth/login">Login</Link>
        </div>
      </section>
    </main>
  );
};

export default Register;
