import mongoose from "mongoose";

const Users = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    }
})

export default mongoose.model("Users", Users);