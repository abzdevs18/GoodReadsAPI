let express = require('express');
let chalk = require('chalk');
let debug = require('debug')('app');
let morgan = require('morgan');
let path = require('path');
const sql = require('mssql');

const config = {
    server: "splibrary.database.windows.net", // Use your SQL server name
    database: "spLibrary", // Database to connect to
    user: "debian", // Use your username
    password: "D3b1an!?", // Use your password
    port: 1433,
    // Since we're on Windows Azure, we need to set the following options
    options: {
          encrypt: true
      }
   };

sql.connect(config).catch(err => {
    debug(err);
});

let nav = [
    { link: '/book', title: 'Books' },
    { link: '/blog', title: 'Blogs' }
];
let bookRouter = require('./src/routes/bookRoute')(nav);

let app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));

app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));


app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/book', bookRouter);

app.get('/', function (req, res) {
    res.render('index', {
        nav,
        title: 'Story Books'
    });
});

app.listen(3000, function () {
    debug(chalk.cyan("Helllo"));
});