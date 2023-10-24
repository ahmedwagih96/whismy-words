"use client";
import { CategoryType } from "@/typings/mongoTypes";
import useAdminDashboard from "@/hooks/useAdminDashboard";

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
                  <div className="table__button-group">
                    <button
                      type="button"
                      className="table__button-group"
                      onClick={() => deleteCategoryHandler(category._id)}
                      disabled={loading.status}
                    >
                      {loading.status && loading.id === category._id
                        ? "Deleting..."
                        : "Delete Category"}
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

export default CategoriesTable;
