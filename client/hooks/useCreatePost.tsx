"use client";
import { toast } from "react-toastify";
import {
  FormEvent,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { useCreatePostMutation } from "@/redux/services/homeApi";

function useCreatePost(setModal: Dispatch<SetStateAction<boolean>>) {
  const [createPost] = useCreatePostMutation();
  // State
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const [category, setCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // From Submit Handler
  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validation
    if (title.trim() === "") return toast.error("Post Title is required");
    if (category.trim() === "") return toast.error("Post Category is required");
    if (description.trim() === "")
      return toast.error("Post Description is required");
    if (!file) return toast.error("Post Image is required");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
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
    setFile,
    setCategory,
    setTitle,
    setDescription,
    title,
    description,
    file,
    category,
    loading,
  };
}

export default useCreatePost;
