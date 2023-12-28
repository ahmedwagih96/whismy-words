import { baseApi } from "./baseApi";
import { PostType } from "@/typings/mongoTypes";

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPostById: builder.query<PostType, { id: string }>({
      query: ({ id }) => `/api/posts/${id}`,
      providesTags: ["Post"],
    }),
    updatePost: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/api/posts/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Post", 'Posts'],
    }),
    updateComment: builder.mutation({
      query: ({ text, id }) => ({
        url: `/api/comments/${id}`,
        method: "PUT",
        body: { text },
      }),
      invalidatesTags: ["Post", 'Comments'],
    }),
    addComment: builder.mutation({
      query: (newComment) => ({
        url: `/api/comments/`,
        method: "POST",
        body: newComment,
      }),
      invalidatesTags: ["Post", 'Comments'],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/api/comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post", 'Comments'],
    }),
    toggleLike: builder.mutation({
      query: ({ postId }) => ({
        url: `/api/posts/like/${postId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Post"],
      async onQueryStarted({ postId, userId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postApi.util.updateQueryData(
            "getPostById",
            { id: postId },
            (draft) => {
              const post = draft;
              if (post) {
                if (post.likes.includes(userId)) {
                  const newLikes = post.likes.filter((i) => i !== userId);
                  post.likes = newLikes;
                } else {
                  post.likes.push(userId);
                }
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/api/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"]
    }),
  }),
})

export const {
  useGetPostByIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useToggleLikeMutation,
} = postApi;
