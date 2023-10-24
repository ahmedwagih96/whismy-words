import { CategoriesTable } from "@/components";
import { fetchAllCategories } from "@/utils/admin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
async function page() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.isAdmin) {
    redirect("/auth/not-authenticated");
  }
  const allCategories = await fetchAllCategories();
  return (
    <div className="admin">
      <CategoriesTable allCategories={allCategories} />
    </div>
  );
}

export default page;
