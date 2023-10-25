import { revalidatePage } from "@/actions/revalidatePage";
import { request } from "@/utils/request";
import { toast } from "react-toastify";

// Get User {SSR}
export async function fetchUser(userId: string) {
  try {
    const { data } = await request.get(`/api/users/${userId}`);
    return data;
  } catch (error: any) {
    const message = `${error.response.status} - ${error.response.data.message}`;
    throw new Error(message);
  }
}

// Update User
export async function updateUser(
  formData: FormData,
  token: string | undefined,
  id: string
) {
  try {
    const { data } = await request.put(`/api/users/${id}`, formData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    // revalidate path
    revalidatePage(`users/${id}`);
    toast.success(data.message);
    return data.user;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}
