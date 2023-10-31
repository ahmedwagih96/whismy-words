"use client";
import { HandThumbUpIcon as Liked } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as NotLiked } from "@heroicons/react/24/outline";
import { PostType } from "@/typings/mongoTypes";
import { useSession } from "next-auth/react";
import { toggleLike } from "@/utils/posts";
function LikeButton({ post }: { post: PostType }) {
  const { data: session } = useSession();
  const token = session?.user?.token;
  return (
    <div className="postDetails__likes">
      {session?.user ? (
        <>
          {post?.likes?.includes(session.user?.id) ? (
            <Liked
              onClick={() => toggleLike(post?._id, token)}
              className="likeIcon"
            />
          ) : (
            <NotLiked
              onClick={() => toggleLike(post?._id, token)}
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
