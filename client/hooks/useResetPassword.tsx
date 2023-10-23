import { toast } from "react-toastify";
import { ChangeEvent, FormEvent, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { sendForgotPasswordEmail, resetPassword } from "@/utils/passwords";
import { ResetPasswordForm } from "@/typings/types";
import Swal from "sweetalert2";
function useResetPassword() {
  const router = useRouter();
  const { userId, token } = useParams();
  const [resetPasswordForm, setResetPasswordForm] = useState<ResetPasswordForm>(
    {
      email: "",
      password: "",
      verifyPassword: "",
    }
  );
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResetPasswordForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Reset Password Handler
  const resetPasswordHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (resetPasswordForm.password.trim() === "")
      return toast.error("Email is required");
    if (
      resetPasswordForm.password.trim() !==
      resetPasswordForm.verifyPassword.trim()
    )
      return toast.error("Passwords does not match");
    setLoading(true);
    const response = await resetPassword(resetPasswordForm.password, {
      userId,
      token,
    });
    setLoading(false);
    if (response) {
      Swal.fire(`${response}`).then((isOk) => {
        if (isOk) {
          router.push("/auth/login");
        }
      });
      setResetPasswordForm((prev) => ({
        ...prev,
        password: "",
        verifyPassword: "",
      }));
    }
  };

  // Forgot Password Handler
  const forgotPasswordHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (resetPasswordForm.email.trim() === "") {
      return toast.error("Email is required");
    }
    setLoading(true);
    const response = await sendForgotPasswordEmail(resetPasswordForm.email);
    setLoading(false);
    if (response) {
      Swal.fire(`${response}`, "success");
      setResetPasswordForm((prev) => ({
        ...prev,
        email: "",
      }));
    }
  };

  return {
    resetPasswordHandler,
    forgotPasswordHandler,
    handleChange,
    resetPasswordForm,
    loading,
  };
}

export default useResetPassword;
