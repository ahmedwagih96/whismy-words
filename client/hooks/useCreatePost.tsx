"use client";
import { toast } from "react-toastify";
import {
  ChangeEvent,
  FormEvent,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { PostData } from "@/typings/types";
import { useCreatePostMutation } from "@/redux/services/homeApi";

function useCreatePost(setModal: Dispatch<SetStateAction<boolean>>) {
  const [createPost] = useCreatePostMutation();
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

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", postData.title);
    formData.append("description", postData.description);
    formData.append("category", category);
    setLoading(true);
    await createPost(formData)
      .unwrap()
      .then(() => setModal(false))
      .catch((error) => toast.error(error.data.message))
      .finally(() => setLoading(false));
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
