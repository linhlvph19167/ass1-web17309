import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: 3,
    },

});
export default mongoose.model("Product", productSchema);