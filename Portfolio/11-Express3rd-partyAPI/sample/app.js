const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded data

const path = require("path");

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Weather API call
app.post("/weather", (req, res) => {
    const cityName = req.body.cityName;
    const apiKey = "8d16339d7c946a789bbd4c30497e4c3b";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`; // Metric for Celsius

    https.get(url, (response) => {
        let data = "";

        response.on("data", (chunk) => {
            data += chunk;
        });

        response.on("end", () => {
            const weatherData = JSON.parse(data);
            if (weatherData.cod === 200) {
                const temp = weatherData.main.temp;
                const description = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

                res.send(`
                    <h1>The temperature in ${cityName} is ${temp}°C</h1>
                    <p>Description: ${description}</p>
                    <img src="${iconUrl}" alt="Weather icon">
                    <br><a href="/">Go back</a>
                `);
            } else {
                res.send(`<h1>Error: ${weatherData.message}</h1><br><a href="/">Go back</a>`);
            }
        });
    }).on("error", (err) => {
        res.send("Error: " + err.message);
    });
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
