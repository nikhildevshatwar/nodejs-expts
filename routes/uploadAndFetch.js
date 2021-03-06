const fs = require('fs');
const config = require('config');
const router = require('express').Router();
const mime = require('mime');
const uuid = require('uuid/v1');
const jimp = require('jimp');
const diskdb = require('../db/diskdb');

module.exports = router;

router.get('/:imageId', function(req, res) {
    var imageId = req.params.imageId;
    diskdb.getInstance(function(imagesDB) {
        const data = imagesDB.findOne({name: imageId});
        var stream = fs.createReadStream(data.filePath);

        stream.on('error', function(error) {
            res.writeHead(404, 'Not Found');
            res.write('404: File Not Found!');
            res.end();
        });

        res.statusCode = 200;
        stream.pipe(res);
    });
});

function resizeImage(img, quality, priv) {
    w = img.bitmap.width;
    h = img.bitmap.height;
    console.log("JIMP: Size = " + w + "x" + h);

    if (w > 32 && h > 32 && quality < 6) {

        fileName = priv.prefix + "_" + quality + "." + img.getExtension();
        filePath = priv.path + "/" + fileName;
        half = img.scale(0.5)

        console.log("JIMP: Resized to half => " + filePath);
        half.write(filePath, function() {
            const data = {
                name: fileName,
                filePath: filePath,
                quality: quality,
            }
            priv.db.save(data);
            resizeImage(half, quality + 1, priv);
        });
    }
}


router.post('/upload', function(req, res) {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    const sampleFile = req.files.sampleFile;
    const prefix = uuid();
    const fileName = prefix + "_0." + mime.getExtension(sampleFile.mimetype);
    const filePath = config.get('dataserver.upload.path') + '/' + fileName;
    const redirectPath = req.body.next;
    diskdb.getInstance(function(imagesDB) {
        sampleFile.mv(filePath, function(err) {
            if (err) {
                return res.status(500).send(err);
            }
            const data = {
                name: fileName,
                filePath: filePath,
                quality: 0,
            }
            imagesDB.save(data);
            if (redirectPath) {
                res.redirect(redirectPath);
            } else {
                res.send(data);
            }

            resizePath = config.get('dataserver.processed.path')
            var priv = {
                path: resizePath,
                prefix: prefix,
                db: imagesDB,
            };

            console.log("Post processing image " + filePath);
            jimp.read(filePath, function(err, img) {
                resizeImage(img, 1, priv)
                //Shall we keep DB connection open while resizing??
            });
        });
    });
});
