var express = require('express');
var router = express.Router();

const Places = require("../models/places");

router.post('/places', (req, res) => {
    const { nickname, name, latitude, longitude } = req.body;
    const newPlaces = new Places({ nickname, name, latitude, longitude });

    newPlaces.save().then(() => {
        res.json({ result: true });
    });
});

router.get('/places/:nickname', (req, res) => {
    Places.find({ nickname: { $regex: new RegExp(req.params.nickname, 'i') } }).then(places => {
        if (places) {
            res.json({ result: true, places: places });
        } else {
            res.json({ result: false, error: "Places not found" });
        }
    });
});

router.delete('/places', (req, res) => {
    const nickname = req.body.nickname;

    Places.deleteOne({ nickname: { $regex: new RegExp(nickname, 'i') } })
        .then(result => {
            if (result.deletedCount > 0) {
                res.json({ result: true });
            } else {
                res.json({ result: false, error: "Places not found" });
            }
        });
});

module.exports = router
