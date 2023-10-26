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
import { deletePost, updatePost } from "@/utils/posts";
import { useSession } from "next-auth/react";
import { revalidatePage } from "@/actions/revalidatePage";

function useUpdatePost(
  post?: PostType,
  setModal?: Dispatch<SetStateAction<boolean>>
) {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.token;
  // State
  const [file, setFile] = useState<File>();
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [category, setCategory] = useState<string>(post?.category || "");
  const [postData, setPostData] = useState<PostData>({
    title: "",
    description: "",
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
      postId: id,
      formData,
      token,
    };
    const isPostUpdated = await updatePost(newPost);
    revalidatePage(`posts/${post?._id}`);
    setLoading(false);
    if (setModal) {
      if (isPostUpdated) setModal(false);
    }
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
        router.push(`/`);
        await deletePost(post._id, token);
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
