"use client";
import { PostType } from "@/typings/mongoTypes";
import { useState, useRef } from "react";
import { Modal, UpdatePostForm } from "@/components";
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import useDropdown from "@/hooks/useDropdown";
import useUpdatePost from "@/hooks/useUpdatePost";
function EditPost({ post }: { post: PostType }) {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  // useDropdown custom hook
  useDropdown(dropDownRef, () => setDropDown(false));
  const { updateModal, setUpdateModal, deletePostHandler } = useUpdatePost();
  return (
    <>
      <div
        className="kebab"
        ref={dropDownRef}
        style={{ position: "relative", top: 0, right: 0 }}
      >
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
                deletePostHandler(post);
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
        <Modal setModal={setUpdateModal} title={"Update Your Post"}>
          <UpdatePostForm post={post} setModal={setUpdateModal} />
        </Modal>
      ) : null}
    </>
  );
}

export default EditPost;
