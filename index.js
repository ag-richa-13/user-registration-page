const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./server/routes/user');
const session = require('express-session');
const flash = require('connect-flash');
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sourceFolder = path.join(__dirname, 'public');

app.use(express.static(sourceFolder));

app.use(session({
    secret: 'UB&iY^B^',
    resave: false,
    saveUninitialized: true

}));


app.use(flash());
app.use('/', routes);

app.listen(port, function() {
    console.log(`listening on port ${port}`);
});