const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const settings = require("./default/settings");

const errorController = require("./controllers/error");

// middleware
app.use(morgan("dev"));
app.set("port", settings.DEFAULT_PORT);
app.set("json spaces", settings.JSON_SPACES);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// routes
app.use("/api/products", require("./routes/products"));
app.use(errorController.get404);

async function main() {
    await app.listen(app.get("port"));
    console.log(`Server running on http://localhost:${app.get("port")}`)
}
main();