import { PostsTable } from "@/components";
import { fetchAllPosts } from "@/utils/admin";
import { PostType } from "@/typings/mongoTypes";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
async function page() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.isAdmin) {
    redirect("/auth/not-authenticated");
  }
  const token = session.user.token
  const allPosts: PostType[] = await fetchAllPosts(token);
  return (
    <div className="admin">
      <PostsTable allPosts = {allPosts} />
    </div>
  );
}

export default page;
