import { request } from "@/utils/request";
import { toast } from "react-toastify";
import { Params } from "@/typings/types";

// Forgot Password
export async function sendForgotPasswordEmail(email: string) {
  try {
    const { data } = await request.post(`/api/password/send-reset-link`, {
      email,
    });
    return data.message;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}

// Reset Password
export async function resetPassword(
  newPassword: string,
  { userId, token }: { userId: Params; token: Params }
) {
  try {
    const { data } = await request.post(
      `/api/password/reset-password-link/${userId}/${token}`,
      {
        password: newPassword,
      }
    );
    return data.message;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}

// Verify Password Link {SSR}
export async function verifyPasswordLink(userId: Params, token: Params) {
  try {
    await request.get(`/api/password/reset-password-link/${userId}/${token}`);
  } catch (error: any) {
    const message = `${error.response.status} - ${error.response.data.message}`;
    throw new Error(message);
  }
}
