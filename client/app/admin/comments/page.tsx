import { CommentsTable } from "@/components";
import { fetchAllComments } from "@/utils/admin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
async function page() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.isAdmin) {
    redirect("/auth/not-authenticated");
  }
  const token = session.user.token;
  const allComments = await fetchAllComments(token);
  return (
    <div className="admin">
      <CommentsTable allComments={allComments} />
    </div>
  );
}

export default page;
