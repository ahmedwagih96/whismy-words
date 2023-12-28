"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { registerUser, deleteUser } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthForm } from "@/typings/types";
import { authFormInitialState } from "@/constants";
export default function useAuthentication() {
  const router = useRouter();
  // State
  const [authForm, setAuthForm] = useState<AuthForm>(authFormInitialState);
  const [loading, setLoading] = useState<boolean>(false);
  const handleAuthForm = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  // REGISTER NEW USER
  const registerHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validation
    if (authForm.username.trim() === "")
      return toast.error("Username is required");
    if (authForm.email.trim() === "") return toast.error("Email is required");
    if (authForm.password.trim() === "")
      return toast.error("Password is required");
    if (authForm.password.trim() !== authForm.verifyPassword.trim())
      return toast.error("Passwords does not match");
    setLoading(true);
    // ADD USER TO DB
    const registerMessage = await registerUser({
      username: authForm.username,
      email: authForm.email,
      password: authForm.password,
    });
    setLoading(false);
    // IF REGISTER USER IS SUCCESSFUL SHOW MESSAGE AND THEN REDIRECT TO LOGIN PAGE
    if (registerMessage) {
      setAuthForm(authFormInitialState);
      Swal.fire({
        text: registerMessage,
        confirmButtonColor: "#0275d8",
      }).then((isOk) => {
        if (isOk) {
          router.push("/auth/login");
        }
      });
    }
  };

  // Login
  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // VALIDATION
    if (authForm.email.trim() === "") return toast.error("Email is required");
    if (authForm.password.trim() === "")
      return toast.error("Password is required");

    setLoading(true);
    // SIGN IN WITH NEXT-AUTH
    const res = await signIn("credentials", {
      email: authForm.email,
      password: authForm.password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      Swal.fire({
        icon: "error",
        text: res.error,
      });
    } else {
      router.push("/");
      setAuthForm(authFormInitialState);
    }
  };

  // LOG OUT
  const logoutHandler = () => {
    // SIGN OUT WITH NEXT-AUTH
    signOut({ redirect: false });
    router.push("/");
  };

  // DELETE USER
  const deleteUserHandler = (id: string) => {
    // VALIDATION MODAL
    Swal.fire({
      title: "Are you sure?",
      text: "This account will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0275d8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (isOk) => {
      if (isOk.isConfirmed) {
        await deleteUser(id);
        logoutHandler();
      }
    });
  };

  return {
    logoutHandler,
    registerHandler,
    loginHandler,
    handleAuthForm,
    setLoading,
    deleteUserHandler,
    loading,
    authForm,
  };
}
