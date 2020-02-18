const express = require('express');
//const cors = require('cors');
//const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/user')
require('./services/passportSer');

const app = express();


//app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

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




