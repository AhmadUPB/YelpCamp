const mongoose = require("mongoose");
const Review = require("./review");
const { campgroundSchema } = require("../schemas");
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    image: String,
    description: String,
    location: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        for (let review of doc.reviews)
            await Review.findByIdAndDelete({ _id: review._id })
    }
});

module.exports = mongoose.model("Campground", CampgroundSchema); 