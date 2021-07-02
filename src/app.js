const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

// static directory
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather forecast app.",
    name: "Marcin Matoga",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page.",
    name: "Marcin Matoga",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page.",
    name: "Marcin Matoga",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please provide address." });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longtitude, location } = {}) => {
        if (error) {
          return res.send({ error });
        }
        forecast(
          latitude,
          longtitude,
          (error, { description, temperature, feelslike } = {}) => {
            if (error) {
              return res.send({ error });
            }

            return res.send({ location, description, temperature, feelslike });
          }
        );
      }
    );
  }
});

app.get("/help/*", (req, res) => {
  res.render("notfound", {
    title: "Help page not found.",
  });
});

app.get("*", (req, res) => {
  res.render("notfound", {
    title: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
