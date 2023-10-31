"use client";
import { CategoryType } from "@/typings/mongoTypes";
import useAdminDashboard from "@/hooks/useAdminDashboard";
import { TrashIcon } from "@heroicons/react/24/solid";
const CategoriesTable = ({
  allCategories,
}: {
  allCategories: CategoryType[];
}) => {
  const { deleteCategoryHandler, loading } = useAdminDashboard();

  return (
    <main className="table__container">
      <div className="table__wrapper">
        <h1 className="table__title">Categories</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>Category Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allCategories?.map((category, index) => (
              <tr key={category._id}>
                <td>{index + 1}</td>
                <td>
                  <b>{category.title}</b>
                </td>
                <td>
                  <div className="actions">
                    <TrashIcon
                      className="deleteIcon"
                      onClick={() => deleteCategoryHandler(category._id)}
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

export default CategoriesTable;
