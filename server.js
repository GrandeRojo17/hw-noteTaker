const express = require("express");

const app = express();
const PORT = process.env.PORT || 3369;

const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3369;

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
//Set up routes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Start up the server.
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
