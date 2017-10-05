const fs = require('fs');
const config = require('config');
const router = require('express').Router();
const mime = require('mime');
const uuid = require('uuid/v1');
const diskdb = require('../db/diskdb');

module.exports = router;

router.get('/:imageId', function(req, res) {
    var imageId = req.params.imageId;
    diskdb.getInstance(function(imagesDB) {
        const data = imagesDB.findOne({_id: imageId});
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

router.post('/upload', function(req, res) {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    const sampleFile = req.files.sampleFile;
    const fileName = uuid() + "." + mime.getExtension(sampleFile.mimetype);
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
            }
            imagesDB.save(data);
            if (redirectPath) {
                return res.redirect(redirectPath);
            } else {
                return res.send(data);
            }
        });
    });
});
