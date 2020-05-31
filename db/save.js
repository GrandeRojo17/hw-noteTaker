//Set up my variables
const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const { v4: uuidv4 } = require("uuid");
uuidv4();
class Save {
  read() {
    return readFile("/db.json", "utf8");
  }

  write(note) {
    return writeFile("/db.json", json.stringify(note));
  }
  getNotes() {
    return this.read().then((notes) => {
      let parseNotes;
      try {
        parseNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parseNotes = [];
      }
      return parseNotes;
    });
  }
  addNote(note) {
    const { title, text } = note;
    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }
    // Add a unique id to the note using uuid package
    const newNote = { title, text, id: uuid() };
    // Get all notes, add the new note, write all the updated notes, return the newNote
    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }

  removeNote(id) {
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}
module.exports = new Save();
