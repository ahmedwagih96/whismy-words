const mongoose = require("mongoose");
const { CategorySchema } = require("../schemas/category.schema.js");

const Category = mongoose.model("Category", CategorySchema);

// Validate Create Category
function validateCreateCategory(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().required().label("Title")
    })
    return schema.validate(obj)
}


module.exports = { Category, validateCreateCategory}