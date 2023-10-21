import { request } from "@/utils/request";
import { toast } from "react-toastify";
import { Params } from "@/typings/types";

// Register User
export async function registerUser(user: {
  email: string;
  password: string;
  username: string;
}) {
  try {
    const { data } = await request.post("/api/auth/register", user);
    return data.message;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}

// Delete User
export async function deleteProfile(
  id: string | undefined,
  token: string | undefined
) {
  try {
    const { data } = await request.delete(`/api/users/profile/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data.message;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}

// Verify User {SSR}
export async function verifyUser(userId: Params, token: Params) {
  try {
    await request.get(`/api/auth/${userId}/verify/${token}`);
  } catch (error: any) {
    const message = `${error.response.status} - ${error.response.data.message}`;
    throw new Error(message);
  }
}
