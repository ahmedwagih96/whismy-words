const router = require("express").Router()
// Controllers
const { createCategory, getAllCategories, deleteCategory } = require("../controllers/category.controller.js")
// Middleware
const { verifyTokenAndAdmin } = require("../middleware/authentication.js")
const { validateId } = require("../middleware/validateObjectId.js")


router.route("/")
    .post(verifyTokenAndAdmin, createCategory)
    .get(getAllCategories)

router.route('/:id').delete(validateId, verifyTokenAndAdmin, deleteCategory);

module.exports = router