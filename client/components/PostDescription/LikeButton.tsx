"use client";
import { HandThumbUpIcon as Liked } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as NotLiked } from "@heroicons/react/24/outline";
import { PostType } from "@/typings/mongoTypes";
import { useSession } from "next-auth/react";
import useUpdatePost from "@/hooks/useUpdatePost";
function LikeButton({ post }: { post: PostType }) {
  const { handleLikes } = useUpdatePost();
  const { data: session } = useSession();
  return (
    <div className="postDetails__likes">
      {session?.user ? (
        <>
          {post?.likes?.includes(session.user?.id) ? (
            <Liked onClick={() => handleLikes(post._id)} className="likeIcon" />
          ) : (
            <NotLiked onClick={() => handleLikes(post._id)} className="likeIcon" />
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
