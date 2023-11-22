import { AddCategoryForm, AdminHeader } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
async function Admin() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.isAdmin) {
    redirect("/auth/not-authenticated");
  }

  return (
    <div className="admin">
      <AdminHeader />
      <AddCategoryForm />
    </div>
  );
}

export default Admin;
