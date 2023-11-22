import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { UserType } from "@/typings/mongoTypes";
import { useSession } from "next-auth/react";
import { UserData } from "@/typings/types";
import { useUpdateUserMutation } from "@/redux/services/userApi";

function useUpdateUser(user: UserType) {
  const { update } = useSession();
  const [updateUser] = useUpdateUserMutation();
  // State
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({
    username: user?.username || "",
    bio: user?.bio || "",
    password: "",
    verifyPassword: "",
  });
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const updateUserHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate
    if (userData.username.trim() === "") {
      toast.error("Username is required");
      return;
    }
    if (userData.username.trim().length < 5) {
      toast.error("Username has to be at least 5 characters");
      return;
    }
    // Set loading to true
    setLoading(true);

    const formData = new FormData();

    if (userData.username !== user.username)
      formData.append("username", userData.username);
    if (userData.bio && userData.bio !== user.bio)
      formData.append("bio", userData.bio);
    if (file) formData.append("image", file);

    // if user changes his password
    if (userData.password) {
      if (userData.password.trim() !== userData.verifyPassword.trim())
        toast.error("Passwords Does Not Match");
      formData.append("password", userData.password);
    }
    await updateUser({ formData, id: user._id })
      .unwrap()
      .then(({ user }: { user: UserType }) => {
        // update user in the session
        update({
          name: user.username,
          profilePhoto: user.profilePhoto.url,
        });
      })
      .catch((error) => toast.error(error.data.message));
    // Set loading to false
    setLoading(false);
  };

  return {
    updateUserHandler,
    setUpdateModal,
    handleChange,
    setFile,
    updateModal,
    userData,
    file,
    loading,
  };
}

export default useUpdateUser;
