"use client";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { addComment, updateComment, deleteComment } from "@/utils/comments";
import { useSession } from "next-auth/react";
function useComment(comment?: string) {
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [updatedComment, setUpdatedComment] = useState<string>(comment || "");
  const [loading, setLoading] = useState<boolean>(false);

  // Add New Comment
  const addCommentHandler = async (
    e: FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();
    if (updatedComment.trim() === "")
      return toast.error("Please write something");
    setLoading(true);
    const newComment = {
      id,
      token,
      text: updatedComment,
    };
    await addComment(newComment);
    setLoading(false);
    setUpdatedComment("");
  };

  // Delete Comment
  const deleteCommentHandler = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        await deleteComment(id, token);
        setLoading(false);
      }
    });
  };

  // Update Comment
  const updateCommentHandler = async (
    e: FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();
    if (updatedComment.trim() === "")
      return toast.error("Please write a comment");
    const newComment = {
      id,
      token,
      text: updatedComment,
    };
    setLoading(false);
    await updateComment(newComment);
    setLoading(true);
    setUpdatedComment("");
  };

  return {
    deleteCommentHandler,
    updateCommentHandler,
    setUpdateModal,
    setUpdatedComment,
    addCommentHandler,
    updateModal,
    updatedComment,
    loading,
  };
}

export default useComment;
