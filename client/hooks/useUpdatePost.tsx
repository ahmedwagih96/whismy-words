"use client";
import { PostType } from "@/typings/mongoTypes";
import { useRouter } from "next/navigation";
import {
  FormEvent,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  useDeletePostMutation,
  useUpdatePostMutation,
} from "@/redux/services/postApi";

function useUpdatePost(
  post?: PostType,
  setModal?: Dispatch<SetStateAction<boolean>>
) {
  const router = useRouter();
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();
  // State
  const [file, setFile] = useState<File>();
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [category, setCategory] = useState<string>(post?.category || "");

  const [title, setTitle] = useState<string>(post?.title || "");
  const [description, setDescription] = useState<string>(
    post?.description || ""
  );

  const [loading, setLoading] = useState<boolean>(false);

  // UPDATE POST
  const updatePostHandler = async (
    e: FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();
    // Validate
    if (title.trim() === "") return toast.error("Post title is required");
    if (category.trim() === "") return toast.error("Post category is required");
    if (description.trim() === "")
      return toast.error("Post description is required");
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    if (file) formData.append("image", file);

    const newPost = {
      id,
      formData,
    };
    await updatePost(newPost)
      .unwrap()
      .then(() => {
        if (setModal) setModal(false);
      })
      .catch((error) => toast.error(error.data.message))
      .finally(() => setLoading(false));
  };

  // DELETE POST
  const deletePostHandler = async (post: PostType) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0275d8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (isOk) => {
      if (isOk.isConfirmed) {
        await deletePost({ id: post._id })
          .then(() => {
            router.push(`/`);
          })
          .catch((error) => toast.error(error.data.message));
      }
    });
  };

  return {
    setFile,
    deletePostHandler,
    setUpdateModal,
    setCategory,
    updatePostHandler,
    setTitle,
    setDescription,
    title,
    description,
    file,
    updateModal,
    category,
    loading,
  };
}

export default useUpdatePost;
