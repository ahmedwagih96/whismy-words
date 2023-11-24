"use client";
import { PostType } from "@/typings/mongoTypes";
import { PostData } from "@/typings/types";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
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
  const [postData, setPostData] = useState<PostData>({
    title: post?.title || "",
    description: post?.description || "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setPostData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const [loading, setLoading] = useState<boolean>(false);

  // UPDATE POST
  const updatePostHandler = async (
    e: FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();
    // Validate
    if (postData.title.trim() === "")
      return toast.error("Post title is required");
    if (category.trim() === "") return toast.error("Post category is required");
    if (postData.description.trim() === "")
      return toast.error("Post description is required");
    setLoading(true);

    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("category", category);
    formData.append("description", postData.description);
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
      confirmButtonColor: "#3085d6",
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
    handleChange,
    file,
    postData,
    updateModal,
    category,
    loading,
  };
}

export default useUpdatePost;
