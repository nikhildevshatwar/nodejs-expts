const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const app = express();

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));

const uploadAndFetchRoutes = require('./routes/uploadAndFetch');

app.use('/', uploadAndFetchRoutes);

app.listen(3001, function() {
    console.log('Data Server listening on port 3001!')
})
