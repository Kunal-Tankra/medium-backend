import mongoose from "mongoose";

const schema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

const Users = mongoose.model('Users', schema)

export default Users