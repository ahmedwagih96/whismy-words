"use client";
import { toast } from "react-toastify";
import {
  ChangeEvent,
  FormEvent,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { createNewPost } from "@/utils/posts";
import { useSession } from "next-auth/react";
import { PostData } from "@/typings/types";
function useCreatePost(setModal: Dispatch<SetStateAction<boolean>>) {
  const { data: session } = useSession();
  const token = session?.user?.token;

  // State
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const [category, setCategory] = useState<string>("");
  const [postData, setPostData] = useState<PostData>({
    title: "",
    description: "",
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPostData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // From Submit Handler
  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validation
    if (postData.title.trim() === "")
      return toast.error("Post Title is required");
    if (category.trim() === "") return toast.error("Post Category is required");
    if (postData.description.trim() === "")
      return toast.error("Post Description is required");
    if (!file) return toast.error("Post Image is required");
    setLoading(true);
    const isPostCreated = await createNewPost(file, postData, category, token);
    setLoading(false);
    if (isPostCreated) setModal(false);
  };

  return {
    formSubmitHandler,
    handleChange,
    setFile,
    setCategory,
    file,
    postData,
    category,
    loading,
  };
}

export default useCreatePost;
