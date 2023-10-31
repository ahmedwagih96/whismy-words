"use client";
import Link from "next/link";
import useAdminDashboard from "@/hooks/useAdminDashboard";
import { UserType } from "@/typings/mongoTypes";
import { TrashIcon } from "@heroicons/react/24/solid";
const UsersTable = ({ allProfiles }: { allProfiles: UserType[] }) => {
  const { deleteProfileHandler, loading } = useAdminDashboard();
  return (
    <main className="table__container">
      <div className="table__wrapper">
        <h1 className="table__title">Users</h1>
        <table className="table">
          <thead>
            <tr>
              <th className="table__hidden">Count</th>
              <th>User</th>
              <th className="table__hidden">Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allProfiles?.map((profile, index) => (
              <tr key={profile._id}>
                <td className="table__hidden">{index + 1}</td>
                <td>
                  <div className="table__image">
                    <Link href={`/users/${profile._id}`}>
                      <img
                        src={profile.profilePhoto.url}
                        alt="User Profile Image"
                        className="table__user-image"
                      />
                      <span className="table__username">
                        {profile.username}
                      </span>
                    </Link>
                  </div>
                </td>
                <td className="table__hidden">
                  <b className="user-email">{profile.email}</b>
                </td>
                <td>
                  <div className="actions">
                    <TrashIcon
                      className="deleteIcon"
                      onClick={() => deleteProfileHandler(profile._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default UsersTable;
