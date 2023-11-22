import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Loading } from "@/typings/types";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useDeleteCommentMutation,
  useDeletePostMutation,
  useDeleteUserMutation,
} from "@/redux/services/adminApi";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
function useAdminDashboard() {
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [addCategory] = useAddCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [deletePost] = useDeletePostMutation();
  const [deleteUser] = useDeleteUserMutation();
  // State
  const [category, setCategory] = useState<string>("");
  // Loading States
  const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false);
  const [loading, setLoading] = useState<Loading>({
    status: false,
    id: null,
  });

  // Delete Comment
  const deleteCommentHandler = async (id: string) => {
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
        setLoading({ status: true, id });
        await deleteComment(id)
          .unwrap()
          .catch((error) => toast.error(error.data.message))
          .finally(() => setLoading({ status: false, id: null }));
      }
    });
  };

  // Create New Category
  const createCategoryHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (category.trim() === "")
      return toast.error("Category Title is required");
    setIsAddingCategory(true);
    await addCategory(category)
      .unwrap()
      .then(() => {
        setCategory("");
      })
      .catch((error) => {
        toast.error(error.data.message);
      })
      .finally(() => {
        setIsAddingCategory(false);
      });
  };

  // Delete Category
  const deleteCategoryHandler = async (id: string) => {
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
        setLoading({ status: true, id });
        await deleteCategory(id)
          .unwrap()
          .catch((error) => toast.error(error.data.message))
          .finally(() => setLoading({ status: false, id: null }));
      }
    });
  };

  // Delete Post
  const deletePostHandler = async (id: string) => {
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
        setLoading({ status: true, id });

        await deletePost(id)
          .unwrap()
          .catch((error) => toast.error(error.data.message))
          .finally(() => setLoading({ status: false, id: null }));
      }
    });
  };

  // Delete Profile
  const deleteProfileHandler = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this profile!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (isOk) => {
      if (isOk.isConfirmed) {
        setLoading({ status: true, id });
        await deleteUser(id)
          .unwrap()
          .catch((error) => toast.error(error.data.message))
          .finally(() => setLoading({ status: false, id: null }));
      }
    });
  };

  return {
    setCategory,
    deleteCommentHandler,
    createCategoryHandler,
    deleteCategoryHandler,
    deletePostHandler,
    deleteProfileHandler,
    category,
    isAddingCategory,
    loading,
  };
}

export default useAdminDashboard;
