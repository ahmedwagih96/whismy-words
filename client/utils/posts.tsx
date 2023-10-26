import { PostData, SearchParamsType } from "@/typings/types";
import { request } from "./request";
import { toast } from "react-toastify";
import { revalidatePage } from "@/actions/revalidatePage";

// Fetch Posts Based on Queries {SSR}
export async function fetchPosts({
  category,
  limit,
  sort,
  pageNumber,
}: SearchParamsType) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/posts?category=${category}&limit=${limit}&sort=${sort}&pageNumber=${pageNumber}`
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    const message = `${error.response.status} - ${error.response.data.message}`;
    throw new Error(message);
  }
}

// Create New Post
export async function createNewPost(
  file: File,
  postData: PostData,
  category: string,
  token: string | undefined
) {
  try {
    // create new post
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", postData.title);
    formData.append("description", postData.description);
    formData.append("category", category);
    const { data } = await request.post(`/api/posts`, formData, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success(data.message);
    revalidatePage("/");
    return true;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}

// Fetch Single Post {SSR}
export async function fetchPost(postId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/posts/${postId}`
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    const message = `${error.response.status} - ${error.response.data.message}`;
    throw new Error(message);
  }
}

// Update Post
export async function updatePost(newPost: {
  postId: string;
  token: string | undefined;
  formData: FormData;
}) {
  const { postId, token, formData } = newPost;
  try {
    const { data } = await request.put(`/api/posts/${postId}`, formData, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });
    revalidatePage(`posts/${postId}`);
    toast.success(data.message);
    return data.message;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}

// Delete Post
export async function deletePost(postId: string, token: string | undefined) {
  try {
    const { data } = await request.delete(`/api/posts/${postId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    toast.success(data.message);
  } catch (error: any) {
    toast.success(error.response.data.message);
  }
}

// TOGGLE LIKE
export async function toggleLike(postId: string, token: string | undefined) {
  try {
    await request.put(
      `/api/posts/like/${postId}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    revalidatePage(`posts/${postId}`);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}
