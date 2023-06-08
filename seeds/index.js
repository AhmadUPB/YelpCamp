const mongoose = require("mongoose");
const Campground = require("../models/campground");
const axios = require('axios');
const unSplash = require("unsplash-js");
const cities = require("./cities.js");
const { descriptors, places } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected")
});

const seedImg = async () => {
    try {
        const resp = await axios.get('https://api.unsplash.com/photos/random', {
            params: {
                client_id: '1I24pjy9t6CZvfMNPBlrCb7Ut4c_TZoJ-KWN2PZFvpw',
                collections: '483251',
            },
        })
        return resp.data.urls.small
    } catch (err) {
        console.error(err)
    }
};

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10
        const imageUrl = await seedImg();
        const c = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: imageUrl,
            description:
                'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, nihil tempora vel aspernatur quod aliquam illum! Iste impedit odio esse neque veniam molestiae eligendi commodi minus, beatae accusantium, doloribus quo!',
            price: price,
        })
        await c.save();
    }
}

seedDB().then(async () => {
    await mongoose.connection.close();
    console.log("seeding process was successful, database was closed ")
}).catch((e) => {
    console.log(e);
    console.log("seeding process was not successful, database was not closed ")
});