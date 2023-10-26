import { revalidatePage } from "@/actions/revalidatePage";
import { request } from "@/utils/request";
import { toast } from "react-toastify";

// Add New Comment
export const addComment = async (newComment: {
  id: string;
  token: string | undefined;
  text: string;
}) => {
  try {
    const { text, id: postId, token } = newComment;
    const { data } = await request.post(
      `/api/comments`,
      { text, postId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    toast.success(data.message);
    revalidatePage(`posts/${newComment.id}}`);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};


// Delete Comment 
export const deleteComment = async (id: string, token: string | undefined) => {
  try {
    const { data } = await request.delete(`/api/comments/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    toast.success(data.message);
    revalidatePage(`posts/${id}`);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

// Update Comment
export const updateComment = async (newComment: {
  id: string;
  token: string | undefined;
  text: string;
}) => {
  try {
    const { text, id, token } = newComment;
    const { data } = await request.put(
      `/api/comments/${id}`,
      { text },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    toast.success(data.message);
    revalidatePage(`posts/${newComment.id}`);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};
