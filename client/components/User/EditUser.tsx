"use client";
import { useState, useRef } from "react";
import { Modal, UpdateUserForm } from "@/components";

import { EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import useDropdown from "@/hooks/useDropdown";
import useAuthentication from "@/hooks/useAuthentication";
import useUpdateProfile from "@/hooks/useUpdateUser";
import { UserType } from "@/typings/mongoTypes";

function EditUser({ user }: { user: UserType }) {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  // useDropdown custom hook
  useDropdown(dropDownRef, () => setDropDown(false));
  const { deleteUserHandler } = useAuthentication();
  const { updateModal, setUpdateModal } = useUpdateProfile(user);
  return (
    <>
      <div className="kebab" ref={dropDownRef}>
        <EllipsisVerticalIcon
          className="kebab__icon"
          onClick={() => setDropDown((prev) => !prev)}
        />
        {dropDown ? (
          <ul className="kebab__dropdown">
            <li
              onClick={() => {
                setDropDown(false);
                setUpdateModal(true);
              }}
              className="kebab__dropdown-item"
            >
              <PencilSquareIcon className="editIcon" />
              <span>Edit</span>
            </li>
            <li
              onClick={() => {
                setDropDown((prev) => !prev);
                deleteUserHandler();
              }}
              className="kebab__dropdown-item"
            >
              <TrashIcon className="deleteIcon" />
              <span>Delete</span>
            </li>
          </ul>
        ) : null}
      </div>
      {updateModal ? (
        <Modal setModal={setUpdateModal} title={"Update Your Profile"}>
          <UpdateUserForm user={user} setUpdateModal={setUpdateModal} />
        </Modal>
      ) : null}
    </>
  );
}

export default EditUser;
