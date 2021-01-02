const express = require('express')
const bodyParser = require('body-parser')
// const cors = require('cors');

const app = express()
port = process.env.PORT || 3000

// var corsOptions = {
//     origin: "http://localhost:8081"
// };

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors(corsOptions));

const db = require('./api/models');
db.sequelize.sync();

app.get('/', (req, res) => {
    res.json({
        message: "This is an OK message"
    });
});

// Apply all the routes to the app
require("./api/routes/createGroupRoutes")(app);

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
})