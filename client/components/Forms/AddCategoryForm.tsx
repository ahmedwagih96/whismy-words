"use client";
import useAdminDashboard from "@/hooks/useAdminDashboard";
function AddCategoryForm() {
  const { createCategoryHandler, category, setCategory, isAddingCategory } =
    useAdminDashboard();
  return (
    <div className="addCategory">
      <h6 className="addCategory__title">Add New Category</h6>
      <form
        onSubmit={(e) => {
          createCategoryHandler(e);
        }}
        className="addCategory__form"
      >
        <div className="addCategory__form-group">
          <label htmlFor="title">Category Title</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            type="text"
            id="title"
            placeholder="Enter Category Title"
          />
        </div>
        <button
          type="submit"
          className="addCategory__btn"
          disabled={isAddingCategory}
        >
          {isAddingCategory ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  );
}

export default AddCategoryForm;
