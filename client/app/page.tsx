"use client";
import "./home.css";
import {
  Sidebar,
  Pagination,
  Posts,
  CreatePost,
  LoadingSpinner,
} from "@/components";
import { useSearchParams } from "next/navigation";
import { useGetPostsBySearchParamsQuery } from "@/redux/services/homeApi";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const params = useSearchParams();

  const {
    isLoading,
    data: fetchedPosts,
    error,
    isFetching,
  } = useGetPostsBySearchParamsQuery({
    category: params.get("category") || "",
    limit: params.get("limit") || "",
    sort: params.get("sort") || "",
    pageNumber: params.get("pageNumber") || "",
  });

  if (error) {
    const typedError = error as { status: number; data: { message: string } };
    const message =
      `${typedError.status} - ${typedError.data.message}` ||
      "An error occurred.";
    throw new Error(message);
  }

  return (
    <main>
      {isLoading || isFetching ? (
        <LoadingSpinner />
      ) : (
        <>
          <section className="home__posts">
            <div className="posts__container">
              <div className="posts__header">
                <h2 className="posts__title">Latest Posts</h2>
                {session?.user ? <CreatePost /> : null}
              </div>
              <Sidebar />
              {fetchedPosts?.postsCount ? (
                <Posts posts={fetchedPosts.posts} />
              ) : (
                <div className="no__posts">
                  There are no <span>Posts</span> that matches your search
                </div>
              )}
            </div>
          </section>
          {fetchedPosts?.posts.length ? (
            <Pagination postsCount={fetchedPosts?.postsCount} />
          ) : null}
        </>
      )}
    </main>
  );
}
