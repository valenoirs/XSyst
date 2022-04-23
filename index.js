const express = require('express')
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const cors = require('cors');

require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(cors())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

app.use((req, res, next) => {
    if(req.session.idUser){
        res.locals.idUser = req.session.idUser;
    }
    if(req.session.idAdmin){
        res.locals.idAdmin = req.session.idAdmin;
    }

    next();
});

app.use(flash());

// Templating Engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(expressLayouts);
app.use(methodOverride('_method'));

app.use(express.urlencoded({extended: true}))
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log(`Successfuly connected to MongoDB Atlass`))
.catch((error) => console.log(error));

// HTTP Routes
app.use('/', require('./routes/user'));

// Ping Server!
app.get('/ping', (req, res, next) => {
    res.send('<h4>Putang ina mo bobo talaga gago!<h4><h4>Sekarang server sementara berjalan!<h4><h4>Now the server is running!<h4>');
});

app.use('/', (req, res) => {
    res.status(404)
    res.send('<h1>404</h1>');
});

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})