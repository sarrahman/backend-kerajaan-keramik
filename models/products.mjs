import mongoose from "mongoose";

const Products = mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    harga: {
        type: Number,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Products", Products);