"use client";
import { AdminCard, LoadingSpinner } from "@/components";
import {
  useFetchAllCategoriesQuery,
  useFetchAllCommentsQuery,
  useFetchAllUsersQuery,
  useFetchPostsCountQuery,
} from "@/redux/services/adminApi";
import {
  UsersIcon,
  TagIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  DocumentIcon,
} from "@heroicons/react/24/solid";
function AdminHeader() {
  const {
    data: allProfiles,
    error: profilesError,
    isLoading: profilesLoading,
  } = useFetchAllUsersQuery(null);
  const {
    data: postsCount,
    error: postsCountError,
    isLoading: postsCountLoading,
  } = useFetchPostsCountQuery(null);
  const {
    data: allCategories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useFetchAllCategoriesQuery(null);
  const {
    data: allComments,
    error: commentsError,
    isLoading: commentsLoading,
  } = useFetchAllCommentsQuery(null);

  if (profilesError || postsCountError || categoriesError || commentsError) {
    const error =
      profilesError || postsCountError || categoriesError || commentsError;
    const typedError = error as { status: number; data: { message: string } };
    const message =
      `${typedError.status} - ${typedError.data.message}` ||
      "An error occurred.";
    throw new Error(message);
  }
  return (
    <>
      {profilesLoading ||
      postsCountLoading ||
      categoriesLoading ||
      commentsLoading ? (
        <LoadingSpinner />
      ) : allCategories && allComments && postsCount && allProfiles ? (
        <div className="admin__header">
          <AdminCard
            title="users"
            count={allProfiles.length}
            Icon={UsersIcon}
          />
          <AdminCard title="posts" count={postsCount} Icon={DocumentIcon} />
          <AdminCard
            title="categories"
            count={allCategories.length}
            Icon={TagIcon}
          />
          <AdminCard
            title="comments"
            count={allComments.length}
            Icon={ChatBubbleOvalLeftEllipsisIcon}
          />
        </div>
      ) : null}
    </>
  );
}

export default AdminHeader;
