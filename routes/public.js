const fs = require('fs');
const config = require('config');
const router = require('express').Router();
const diskdb = require('../db/diskdb');

module.exports = router;

router.get('/', function(req, res) {
    diskdb.getInstance(function(imagesDB) {
        return res.render('index', {
            images: imagesDB.find({quality: 5}).map(function(e) {
                return {
                    fname: e.name,
                    url: config.get('dataserver.url') + '/' + e.name,
                };
            })
        });
    });
});
