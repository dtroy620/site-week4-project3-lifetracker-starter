const express = require("express");
const router = express.Router();
const Nutrition = require('../models/nutrition')

router.post('/new', async (req, res, next) => {
    try {
        const newNutrition = await Nutrition.createNutrition(req.body);
        return res.status(200).json({nutrition: newNutrition})
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try{
        const nutrition = await Nutrition.listNutrition(req.body.user_id)
        return res.status(200).json({nutrition: nutrition})
    } catch (err) {
        next(err)
    }
})
module.exports = router