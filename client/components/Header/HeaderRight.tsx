"use client";
import { AuthLinks, User } from "@/components";
import { useSession } from "next-auth/react";
function HeaderRight() {
  const { data: session } = useSession();
  return (
    <div className="header__right">
      {session?.user ? <User /> : <AuthLinks />}
    </div>
  );
}

export default HeaderRight;
