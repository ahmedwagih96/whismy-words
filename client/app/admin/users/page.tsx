import { UsersTable } from "@/components";
import { fetchAllProfiles } from "@/utils/admin";
import { UserType } from "@/typings/mongoTypes";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
async function page() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.isAdmin) {
    redirect("/auth/not-authenticated");
  }
  const token = session.user.token;
  const allProfiles: UserType[] = await fetchAllProfiles(token);
  return (
    <div className="admin">
      <UsersTable allProfiles={allProfiles} />
    </div>
  );
}

export default page;
