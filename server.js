const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const app = express();

app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


//routes
app.use("/api/auth", require('./routes/auth.route'));
app.use("/api/student", require('./routes/students.route'));
app.use('/api/account', require('./routes/account.route'));
app.use('/api/mentor', require('./routes/mentor.route'));
app.use('/api/evaluator', require('./routes/evaluator.route'))
app.use('/api/group', require('./routes/group.route'));
app.use('/api/topic', require('./routes/topic.route'));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to capstone management system." });
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

db.sequelize.sync();