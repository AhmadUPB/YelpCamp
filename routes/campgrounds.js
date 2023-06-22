const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Campground = require("../models/campground");
const flash = require('connect-flash');
const { campgroundSchema } = require("../schemas");
const { isLoggedIn } = require('../middleware');

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400);
    }
    else {
        next();
    }
}


router.get('/', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
});

router.post('/', validateCampground, catchAsync(async (req, res, next) => {


    const campground = new Campground(req.body.campground);
    await campground.save();
    req.flash('success', 'successfully created a new campground!');
    res.redirect(`/campgrounds/${campground._id}`);
}));


router.get('/new', isLoggedIn, (req, res) => {

    res.render("campgrounds/new");
});

router.get('/:id/edit', isLoggedIn, catchAsync(async (req, res) => {

    const campground = await Campground.findById(req.params.id);
    if (!campground) {
        req.flash('error', 'Cannot find that campground');
        res.redirect('/campgrounds');
    }
    res.render("campgrounds/edit", { campground });

}));

router.get('/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate("reviews");

    if (!campground) {
        req.flash('error', 'Cannot find that campground');
        res.redirect('/campgrounds');
    }
    res.render("campgrounds/show", { campground });
}));


router.put('/:id', isLoggedIn, validateCampground, catchAsync(async (req, res) => {
    const id = req.params.id;
    const campground = await Campground.findByIdAndUpdate(id, { title: req.body.campground.title, location: req.body.campground.location });
    req.flash('success', 'successfully created a new campground!');

    res.redirect(`/campgrounds/${id}`);
}));

router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const id = req.params.id;
    const campground = await Campground.findByIdAndDelete(id);
    req.flash('success', 'successfully deleted the campground!');

    res.redirect(`/campgrounds`);
}));

module.exports = router;