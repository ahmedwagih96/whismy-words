const { StatusCodes } = require("http-status-codes")
const { Category, validateCreateCategory } = require("../models/category.model")

/**-----------------------------------------------------
    * @desc  Get All Categories 
    * @route /api/category
    * @method GET
    * @access public
-----------------------------------------------------*/
const getAllCategories = async (req, res) => {
    const categories = await Category.find();
    res.status(StatusCodes.OK).json(categories)
}

/**-----------------------------------------------------
    * @desc  Delete Category
    * @route /api/category/:id
    * @method DELETE
    * @access public (only admin)
-----------------------------------------------------*/
const deleteCategory = async (req, res) => {
    // validate
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'Category Not Found' })
    }
    await Category.findByIdAndDelete(req.params.id);

    // response to client 
    const categories = await Category.find();
    res.status(StatusCodes.OK).json({ message: 'Category has been deleted', categories })
}

/**-----------------------------------------------------
    * @desc  Create New Category
    * @route /api/category
    * @method POST
    * @access private (only admin)
-----------------------------------------------------*/
const createCategory = async (req, res) => {
    // validate
    const { error } = validateCreateCategory(req.body);
    if (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message })
    }
    // check if category already exists
    const title = req.body.title[0].toUpperCase() + req.body.title.slice(1)
    let category = await Category.findOne({ title: title })
    if (category) {
        return res.status(StatusCodes.CONFLICT).json({ message: 'Category already exist' })
    }
    // create category
    await Category.create({
        title,
        user: req.user.id
    });
    // response to client 
    res.status(StatusCodes.CREATED).json({ message: 'New category created' })
}

module.exports = { createCategory, getAllCategories, deleteCategory }