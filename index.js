let express = require('express');
let chalk = require('chalk');
let debug = require('debug')('app');
let morgan = require('morgan');
let path = require('path');
const sql = require('mssql');

const bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let passport = require('passport');

let nav = [
    { link: '/book', title: 'Books' },
    { link: '/blog', title: 'Blogs' }
];
let bookRouter = require('./src/routes/bookRoute')(nav);
let adminRoute = require('./src/routes/adminRoute')(nav);
let authRoute = require('./src/routes/authRoute')(nav);

let app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret:"D3b1an!?"}));

require('./src/config/passport')(app);

app.use(express.static(path.join(__dirname, '/public/')));

app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));


app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/book', bookRouter);
app.use('/admin', adminRoute);
app.use('/auth', authRoute);
app.get('/', function (req, res) {
    res.render('index', {
        nav,
        title: 'Story Books'
    });
});

app.listen(3000, function () {
    debug(chalk.cyan("Helllo"));
});