"use client";
import Link from "next/link";
import useAdminDashboard from "@/hooks/useAdminDashboard";
import { UserType } from "@/typings/mongoTypes";
const UsersTable = ({ allProfiles }: { allProfiles: UserType[] }) => {
  const { deleteProfileHandler, loading } = useAdminDashboard();
  return (
    <main className="table__container">
      <div className="table__wrapper">
        <h1 className="table__title">Users</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allProfiles?.map((profile, index) => (
              <tr key={profile._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table__image">
                    <img
                      src={profile.profilePhoto.url}
                      alt="User Profile Image"
                      className="table__user-image"
                    />
                    <span className="table__username">{profile.username}</span>
                  </div>
                </td>
                <td>
                  <b className="user-email">{profile.email}</b>
                </td>
                <td>
                  <div className="table__button-group">
                    <button>
                      <Link href={`/profile/${profile._id}`}>View Profile</Link>
                    </button>
                    <button
                      type="button"
                      className="table__button-group"
                      onClick={() => deleteProfileHandler(profile._id)}
                      disabled={loading.status}
                    >
                      {loading.status && loading.id === profile._id
                        ? "Deleting..."
                        : "Delete Profile"}
                    </button>
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
