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
      <li
        onClick={() => {
          router.push(`/users/${session?.user?.id}`);
          setDropDown(false);
        }}
        className="header__dropdown-item"
      >
        <UserIcon />
        <span>Profile</span>
      </li>
      {session?.user?.isAdmin ? (
        <li
          className="header__dropdown-item"
          onClick={() => {
            setDropDown(false);
            router.push("/admin");
          }}
        >
          <CheckBadgeIcon />
          Admin
        </li>
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
