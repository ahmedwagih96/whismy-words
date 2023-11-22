import '../../../auth.css'
import { ResetPasswordForm } from "@/components";
import { verifyPasswordLink } from "@/utils/passwords";


async function ForgotPassword({
  params,
}: {
  params: { userId: string; token: string };
}) {
  await verifyPasswordLink(params.userId, params.token);
  return (
    <main>
      <section className="authForm__container">
        <h1 className="authForm__title">Forgot Password</h1>
        <ResetPasswordForm />
      </section>
    </main>
  );
}

export default ForgotPassword;
