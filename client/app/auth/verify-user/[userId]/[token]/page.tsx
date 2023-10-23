import '../../../auth.css'
import Link from "next/link";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { verifyUser } from "@/utils/auth";
async function page({ params }: { params: { userId: string; token: string } }) {
  await verifyUser(params.userId, params.token);
  return (
    <main className="verify">
      <CheckBadgeIcon className="verify__icon" />
      <h1 className="verify__title">
        Your email address has been successfully verified
      </h1>
      <Link href="/auth/login" className="verify__link">
        {" "}
        Go To Login Page
      </Link>
    </main>
  );
}

export default page;
