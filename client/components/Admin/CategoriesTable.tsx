"use client";
import useAdminDashboard from "@/hooks/useAdminDashboard";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useFetchAllCategoriesQuery } from "@/redux/services/adminApi";
import { LoadingSpinner } from "@/components";
const CategoriesTable = () => {
  const { deleteCategoryHandler } = useAdminDashboard();
  const {
    data: allCategories,
    error,
    isLoading,
  } = useFetchAllCategoriesQuery(null);
  if (error) {
    const typedError = error as { status: number; data: { message: string } };
    const message =
      `${typedError.status} - ${typedError.data.message}` ||
      "An error occurred.";
    throw new Error(message);
  }
  return (
    <main className="table__container">
      {isLoading ? <LoadingSpinner /> : null}
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
