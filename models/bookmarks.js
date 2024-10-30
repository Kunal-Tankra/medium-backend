import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts'
    }
})

const Bookmarks = mongoose.model('Bookmarks', schema)
export default Bookmarks