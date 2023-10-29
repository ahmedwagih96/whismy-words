"use client";
import { useSession } from "next-auth/react";
import useAuthentication from "@/hooks/useAuthentication";
import {
  ArrowLeftOnRectangleIcon,
  UserIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
function Dropdown({
  setDropDown,
}: {
  setDropDown: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: session } = useSession();
  const { logoutHandler } = useAuthentication();
  const router = useRouter();
  return (
    <ul className="header__dropdown">
      <Link
        href={`/users/${session?.user?.id}`}
        onClick={() => {
          setDropDown(false);
        }}
        className="header__dropdown-item"
      >
        <UserIcon />
        <span>Profile</span>
      </Link>
      {session?.user?.isAdmin ? (
        <Link
          href={"/admin"}
          className="header__dropdown-item"
          onClick={() => {
            setDropDown(false);
          }}
        >
          <CheckBadgeIcon />
          Admin
        </Link>
      ) : null}
      <li
        onClick={() => {
          setDropDown(false);
          logoutHandler();
        }}
        className="header__dropdown-item"
      >
        <ArrowLeftOnRectangleIcon />
        <span>Logout</span>
      </li>
    </ul>
  );
}

export default Dropdown;
