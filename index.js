const express = require('express');
const mongoose = require('mongoose');
const cookieSession= require('cookie-session');
const passport
const keys = require('./config/keys');
require('./models/user')
require('./services/passportService');

const app = express();




mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) {
        console.log("connection failed");
        throw err;
    }
    console.log("connection success");
});

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`listening on port ${PORT}`)
);




