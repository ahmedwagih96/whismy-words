import Link from "next/link";
import { ArrowRightOnRectangleIcon, UserPlusIcon } from "@heroicons/react/24/solid";
function AuthLinks() {
  return (
    <>
      <Link href="/auth/login" className="header__authLink">
        <ArrowRightOnRectangleIcon/>
        <span>Login</span>
      </Link>
      <Link href="/auth/register" className="header__authLink">
        <UserPlusIcon />
        <span>Register</span>
      </Link>
    </>
  );
}

export default AuthLinks;
