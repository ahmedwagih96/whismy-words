import { revalidatePage } from "@/actions/revalidatePage";
import { request } from "@/utils/request";
import { toast } from "react-toastify";

// Fetch All Posts {SSR}
export async function fetchAllPosts(token: string) {
  try {
    const { data } = await request.get(`/api/posts/all-posts`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data.posts;
  } catch (error: any) {
    const message = `${error.response.status} - ${error.response.data.message}`;
    throw new Error(message);
  }
}

// Fetch Post Count {SSR}
export async function fetchPostsCount(token: string) {
  try {
    const { data } = await request.get(`/api/posts/count`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error: any) {
    const message = `${error.response.status} - ${error.response.data.message}`;
    throw new Error(message);
  }
}

// Delete Post
export const deletePost = async (postId: string, token: string | undefined) => {
  try {
    const { data } = await request.delete(`/api/posts/${postId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    toast.success(data.message);
    revalidatePage(`/admin/posts`);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

// Get All Profiles {SSR}
export async function fetchAllProfiles(token: string | undefined) {
  try {
    const { data } = await request.get(`/api/users/all/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error: any) {
    const message = `${error.response.status} - ${error.response.data.message}`;
    throw new Error(message);
  }
}

// Delete Profile
export const deleteProfile = async (id: string, token: string | undefined) => {
  try {
    const { data } = await request.delete(`/api/users/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    toast.success(data.message);
    revalidatePage(`/admin/users`);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

// Fetch All Categories {SSR}
export async function fetchAllCategories() {
  try {
    const { data } = await request.get(`/api/category`);
    return data;
  } catch (error: any) {
    const message = `${error.response.status} - ${error.response.data.message}`;
    throw new Error(message);
  }
}

// Create New Category
export const addCategory = async (title: string, token: string | undefined) => {
  try {
    const { data } = await request.post(
      `/api/category/`,
      { title },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    toast.success(data.message);
    revalidatePage("/admin");
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

// Delete Category
export const deleteCategory = async (id: string, token: string | undefined) => {
  try {
    const { data } = await request.delete(`/api/category/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    toast.success(data.message);
    revalidatePage(`/admin/categories`);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

// Get All Comments {SSR}
export async function fetchAllComments(token: string | undefined) {
  try {
    const { data } = await request.get(`/api/comments`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error: any) {
    const message = `${error.response.status} - ${error.response.data.message}`;
    throw new Error(message);
  }
}

// Delete Comment
export const deleteComment = async (id: string, token: string | undefined) => {
  try {
    const { data } = await request.delete(`/api/comments/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    toast.success(data.message);
    revalidatePage(`/admin/comments`);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};
