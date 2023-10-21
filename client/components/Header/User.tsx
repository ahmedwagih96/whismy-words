"use client";
import { useState, useRef } from "react";
import { Dropdown } from "@/components";
import useDropdown from "@/hooks/useDropdown";
import { useSession } from "next-auth/react";
function User() {
  const { data: session } = useSession();
  const [dropDown, setDropDown] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  // useDropdown custom hook
  useDropdown(dropDownRef, () => setDropDown(false));

  if (!session) return null;

  return (
    <div className="header__user-info" ref={dropDownRef}>
      <span
        onClick={() => setDropDown((prev) => !prev)}
        className="header__username"
      >
        {session?.user?.name}
      </span>
      <img
        onClick={() => setDropDown((prev) => !prev)}
        src={session?.user?.profilePhoto}
        alt="profile photo"
        className="header__user-photo"
      />
      {dropDown ? <Dropdown setDropDown={setDropDown} /> : null}
    </div>
  );
}

export default User;
