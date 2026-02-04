import mongoose from "mongoose";

const spotcardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

export default mongoose.model("Spotcard", spotcardSchema);