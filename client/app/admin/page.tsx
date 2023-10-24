import { AdminCard, AddCategoryForm } from "@/components";
import {
  fetchAllCategories,
  fetchAllComments,
  fetchAllProfiles,
  fetchPostsCount,
} from "@/utils/admin";
import {
  UsersIcon,
  TagIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  DocumentIcon,
} from "@heroicons/react/24/solid";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
async function Admin() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.isAdmin) {
    redirect("/auth/not-authenticated");
  }
  const token = session.user.token;
  const [allProfiles, postsCount, allCategories, allComments] =
    await Promise.all([
      fetchAllProfiles(token),
      fetchPostsCount(token),
      fetchAllCategories(),
      fetchAllComments(token),
    ]);

  return (
    <div className="admin">
      <div className="admin__header">
        <AdminCard title="users" count={allProfiles.length} Icon={UsersIcon} />
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
      <AddCategoryForm />
    </div>
  );
}

export default Admin;
