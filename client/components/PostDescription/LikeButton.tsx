"use client";
import { HandThumbUpIcon as Liked } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as NotLiked } from "@heroicons/react/24/outline";
import { PostType } from "@/typings/mongoTypes";
import { useSession } from "next-auth/react";
import { useToggleLikeMutation } from "@/redux/services/postApi";
import { toast } from "react-toastify";
function LikeButton({ post }: { post: PostType }) {
  const [toggleLike] = useToggleLikeMutation();
  const handleLikes = async (ids: {
    postId: string;
    userId: string | undefined;
  }) => {
    await toggleLike(ids)
      .unwrap()
      .catch((error) => toast.error(error.data.message));
  };

  const { data: session } = useSession();
  return (
    <div className="postDetails__likes">
      {session?.user ? (
        <>
          {post?.likes?.includes(session.user?.id) ? (
            <Liked
              onClick={() =>
                handleLikes({ postId: post._id, userId: session?.user?.id })
              }
              className="likeIcon"
            />
          ) : (
            <NotLiked
              onClick={() =>
                handleLikes({ postId: post._id, userId: session?.user?.id })
              }
              className="likeIcon"
            />
          )}
        </>
      ) : (
        <NotLiked className="likeIcon signedOut" />
      )}
      <small>{post?.likes?.length}</small>
    </div>
  );
}

export default LikeButton;
