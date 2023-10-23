export const dynamic = "force-dynamic";
import "./home.css";
import { Sidebar, Pagination, Posts } from "@/components";
import { fetchPosts } from "@/utils/posts";
// TYPES
import { PostType } from "@/typings/mongoTypes";
import { HomeProps } from "@/typings/props";

export default async function Home({ searchParams }: HomeProps) {
  const data: { posts: PostType[]; postsCount: number } = await fetchPosts({
    category: searchParams.category || "",
    limit: searchParams.limit || "",
    sort: searchParams.sort || "",
    pageNumber: searchParams.pageNumber || ""
  });
  return (
    <main>
      <section className="home__posts">
        <div className="posts__container">
          <div className="posts__header">
            <h2 className="posts__title">Latest Posts</h2>
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
