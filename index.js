const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();
const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-'+ file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if( file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/jpeg'){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use(bodyParser.json())
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))

// Mengatasi Error CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Method", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})

app.use('/v1/auth', authRoutes);
app.use('/v1/blog', blogRoutes);

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const {message, data} = error;

    res.status(status).json({
        message: message,
        data: data
    })
});

// mongoose.connect('mongodb+srv://ilyas:3KAdNUOmgxMlLZDt@cluster0.rdl2b.mongodb.net/<dbname>?retryWrites=true&w=majority', {useNewUrlParser: true})
mongoose.connect('mongodb://localhost:27017/mern-blog', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(4000, () => console.log("Connection Success!"));
    })
    .catch(err => console.log(err))
