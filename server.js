//I like to connect everything here.
const express = require("express");
//read and write variables
const fs = require("fs");
const save = require("./db/save");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoute");

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3367;

// Set up body parsing, static, and route middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
//Set up routes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// - GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function (req, res) {
  save
    .getNotes()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err));
});
//POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", (req, res) => {
  save
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
  console.log(addNote);
});

app.delete("api/notes/:id", function (req, res) {
  save
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

// Start up the server.
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
