import { PostType } from "@/typings/mongoTypes";
import { PostItem } from "@/components";
import "./posts.css";
async function Posts({ posts }: { posts: PostType[] }) {
  return (
    <div className="posts__list" id="posts">
      {posts?.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
