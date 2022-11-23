const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("mongo CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO mongo connection ERROR!!!!")
        console.log(err)
    })



const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const price = Math.floor(Math.random() * 20) + 10;
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            //YOUR USER ID
            author: '6377c9f100c047a5382fba7b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'lorem ipsum sadfjfel felefelflef',
            price,
            geometry: {
                type: "Point",
                coordinates: [-113.1331, 47.0202]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dcy9cadvp/image/upload/v1669088501/YelpCamp/carfvwzm2zvsfzo5kvmh.jpg',
                  filename: 'YelpCamp/carfvwzm2zvsfzo5kvmh'
                },
                {
                  url: 'https://res.cloudinary.com/dcy9cadvp/image/upload/v1669088504/YelpCamp/eyoowjsmxogzhbp5i1a1.jpg',
                  filename: 'YelpCamp/eyoowjsmxogzhbp5i1a1'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});