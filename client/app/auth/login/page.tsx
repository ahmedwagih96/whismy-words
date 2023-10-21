import '../auth.css'
import { LoginForm } from "@/components";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
const Login = async () => {
  const session = await getServerSession(authOptions);
  console.log(session)
  if (session) {
    redirect("/");
  }
  return (
    <main>
      <section className="authForm__container">
        <h1 className="authForm__title">Login to your account</h1>
        <LoginForm />
        <div className="authForm__link">
          Don't have an account?{" "}
          <Link href="/auth/register">Register Now</Link>
        </div>
      </section>
    </main>
  );
};

export default Login;
