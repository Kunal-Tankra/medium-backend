import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Categories = mongoose.model('Categories', schema)

export default Categories