"use client";
import { useState } from "react";
import { CreatePostForm, Modal } from "@/components";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
function CreatePost() {
  const [isModal, setIsModal] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => setIsModal(true)} className="create__post">
        <PlusCircleIcon className="add__icon" /> Create
      </button>
      {isModal ? (
        <Modal setModal={setIsModal} title={"Create New Post"}>
          <CreatePostForm setModal={setIsModal} />
        </Modal>
      ) : null}
    </>
  );
}

export default CreatePost;
