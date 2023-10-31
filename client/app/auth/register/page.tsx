import "../auth.css";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { RegisterForm } from "@/components";
const Register = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <main>
      <section className="authForm__container">
        <h1 className="authForm__title">Create a new account</h1>
        <RegisterForm />
        <div className="authForm__link">
          Already have an account? <Link href="/auth/login">Login</Link>
        </div>
      </section>
    </main>
  );
};

export default Register;
