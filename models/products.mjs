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
    isPromo: {
        type: Boolean,
        required: true,
        default: false
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Products", Products);