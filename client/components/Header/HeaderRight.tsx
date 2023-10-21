import { AuthLinks, User } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
async function HeaderRight() {
  const session = await getServerSession(authOptions);
  return (
    <div className="header__right">
      {session?.user ? <User /> : <AuthLinks />}
    </div>
  );
}

export default HeaderRight;
