const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

const mongoUrl = "mongodb://127.0.0.1:27017/f1";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const teamSchema = new mongoose.Schema({
    name: String,
    nationality: String,
    url: String,
});
teamSchema.set("strictQuery", true);

const driverSchema = new mongoose.Schema({
    num: Number,
    code: String,
    forename: String,
    surname: String,
    dob: Date,
    nationality: String,
    url: String,
    current_team: String,
});
driverSchema.set("strictQuery", true);

const Team = mongoose.model("Team", teamSchema);
const Driver = mongoose.model("Driver", driverSchema);

// Middleware para cargar datos
const loadData = (req, res, next) => {
    Promise.all([
        Driver.find({}),
        Team.find({})
    ])
    .then(([drivers, teams]) => {
        res.locals.drivers = drivers; 
        res.locals.teams = teams;
        next();
    })
    .catch(err => {
        console.error(err);
        res.status(500).send("Error loading data");
    });
};

app.get("/", loadData, (req, res) => {
    res.render("index", { drivers: res.locals.drivers, teams: res.locals.teams });
});

app.post("/add-driver", (req, res) => {
    const driver = new Driver(req.body);
    driver.save((err) => {
        if (err) return res.status(500).send(err);
        res.redirect("/");
    });
});

app.put("/update-driver/:id", (req, res) => {
    const driverId = req.params.id;
    const updatedData = req.body;

    Driver.findByIdAndUpdate(driverId, updatedData, { new: true }, (err, updatedDriver) => {
        if (err) return res.status(500).send(err);
        res.json(updatedDriver);
    });
});

app.get("/drivers", (req, res) => {
    Driver.find({}, (err, drivers) => {
        if (err) return res.status(500).send(err);
        res.json(drivers);
    });
});

app.get("/teams", (req, res) => {
    Team.find({}, (err, teams) => {
        if (err) return res.status(500).send(err);
        res.json(teams);
    });
});

app.listen(3000, (err) => {
    console.log("Listening on port 3000");
});
