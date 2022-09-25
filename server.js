const express = require('express')
const app = express();
const path = require('path');
require('dotenv').config();
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 4000;

// !important 
app.use(express.static('public'));

//middleware for cookies
app.use(cookieParser());

// built in middleware to handle urlencoded from data
app.use(express.urlencoded({ extended: true }))

// built in middleware for json
app.use(express.json());

const root = path.join(__dirname)

app.get('/', (req, res) => {
    res.sendFile(path.join('public', 'views', 'test.html'), { root: root })
    console.log(req.cookies);
})

// console.log("env",process.env.PORT);
// console.log(PORT);
//! routes
app.use('/register', require("./routes/register"));
app.use('/refresh', require("./routes/refresh"));
app.use('/login', require("./routes/login"));
app.use('/logout', require("./routes/logout"));

// app.use(verifyJWT); // now every routers under this line need to authorized before you use it or undefine routes
app.use('/users', verifyJWT, require('./routes/users'));

app.listen(PORT, () => {
    console.log('Server is Listing to Port: ', PORT);
})