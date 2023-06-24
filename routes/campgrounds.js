const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/campground");
const flash = require('connect-flash');

const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');



router.get('/', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
});

router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'successfully created a new campground!');
    res.redirect(`/campgrounds/${campground._id}`);
}));


router.get('/new', isLoggedIn, (req, res) => {

    res.render("campgrounds/new");
});

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);

    if (!campground) {
        req.flash('error', 'Cannot find that campground');
        res.redirect('/campgrounds');
    }
    res.render("campgrounds/edit", { campground });

}));

router.get('/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: "reviews",
        populate: { path: 'author' }
    }).populate("author");
    if (!campground) {
        req.flash('error', 'Cannot find that campground');
        res.redirect('/campgrounds');
    }
    res.render("campgrounds/show", { campground });
}));


router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res) => {
    const id = req.params.id;
    const camp = await Campground.findById(id);
    if (!req.user._id.equals(camp.author._id)) {
        req.flash('error', 'You do not have permission to edit this campground!');
        res.redirect(`/campgrounds/${req.params.id}`)
    }
    const campground = await Campground.findByIdAndUpdate(id, { title: req.body.campground.title, location: req.body.campground.location });
    req.flash('success', 'successfully created a new campground!');

    res.redirect(`/campgrounds/${id}`);
}));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const id = req.params.id;
    const campground = await Campground.findByIdAndDelete(id);
    req.flash('success', 'successfully deleted the campground!');

    res.redirect(`/campgrounds`);
}));

module.exports = router;