const { StatusCodes } = require("http-status-codes")
const mongoose = require("mongoose")

const validateId = (req, res, next)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(StatusCodes.BAD_REQUEST).json({message: "Invalid Id"})
    }
    next()
}

module.exports = {validateId}