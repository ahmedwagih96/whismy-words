export const dynamic = "force-dynamic";
import "./home.css";
import { Sidebar, Pagination, Posts, CreatePost } from "@/components";
import { fetchPosts } from "@/utils/posts";
// TYPES
import { PostType } from "@/typings/mongoTypes";
import { HomeProps } from "@/typings/props";
// NEXT AUTH
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home({ searchParams }: HomeProps) {
  const session = await getServerSession(authOptions);
  const data: { posts: PostType[]; postsCount: number } = await fetchPosts({
    category: searchParams.category || "",
    limit: searchParams.limit || "",
    sort: searchParams.sort || "",
    pageNumber: searchParams.pageNumber || "",
  });
  return (
    <main>
      <section className="home__posts">
        <div className="posts__container">
          <div className="posts__header">
            <h2 className="posts__title">Latest Posts</h2>
            {session?.user ? <CreatePost /> : null}
          </div>
          <Sidebar />
          {data.postsCount ? (
            <Posts posts={data.posts} />
          ) : (
            <div className="no__posts">
              There are no <span>Posts</span> that matches your search
            </div>
          )}
        </div>
      </section>
      {data.posts.length ? <Pagination postsCount={data?.postsCount} /> : null}
    </main>
  );
}
