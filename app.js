const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const publicRoutes = require('./routes/public');
const imagesRoutes = require('./routes/images');

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('./static'));

app.set('views', './templates');
app.engine('handlebars', exphbs({
    defaultLayout: 'basic',
    layoutsDir: './templates/layouts',
    partialsDir: './templates/partials',
}));
app.set('view engine', 'handlebars');

app.use('/', publicRoutes);
app.use('/images', imagesRoutes);


app.listen(3000, function() {
    console.log('ImageMagick Server listening on port 3000!')
})
