const router = require("express").Router()
// Controllers
const { createCategory, getAllCategories, deleteCategory } = require("../controllers/category.controller.js")
// Middleware
const { verifyAdmin } = require("../middleware/authentication.js")
const { validateId } = require("../middleware/validateObjectId.js")


router.route("/")
    .post(verifyAdmin, createCategory)
    .get(getAllCategories)

router.route('/:id').delete(validateId, verifyAdmin, deleteCategory);

module.exports = router