"use client";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from "@/redux/services/postApi";
function useComment(comment?: string) {
  const [addComment] = useAddCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [updateComment] = useUpdateCommentMutation();

  // STATE
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
      postId: id,
      text: updatedComment,
    };
    await addComment(newComment)
      .unwrap()
      .catch((error) => toast.error(error.data.message))
      .finally(() => {
        setLoading(false);
        setUpdatedComment("");
      });
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
        await deleteComment(id)
          .unwrap()
          .catch((error) => toast.error(error.data.message))
          .finally(() => {
            setLoading(false);
            setUpdatedComment("");
          });
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
      text: updatedComment,
    };
    setLoading(false);
    await updateComment(newComment)
      .unwrap()
      .catch((error) => toast.error(error.data.message))
      .finally(() => {
        setLoading(false);
      });
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
