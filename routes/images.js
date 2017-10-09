const fs = require('fs');
const config = require('config');
const router = require('express').Router();
const diskdb = require('../db/diskdb');

module.exports = router;

router.get('/:imageId', function(req, res) {
    diskdb.getInstance(function(imagesDB) {
        const image = imagesDB.findOne({name: req.params.imageId })
        return res.render('image-one', {
            fname: image.name,
            url: config.get('dataserver.url') + '/' + image.name,
        });
    });
});
