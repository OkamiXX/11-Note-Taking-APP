// Dependecncies
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const util = require('util');

// promise version for the file system write and read.
const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);

class SaveBoiler {
    write(note) {
        return writeNote('db/db.json', JSON.stringify(note));
    }

    read() {
        return readNote('db/db.json', 'utf8');
    }

    getNotes() {
        return this.read().then(notes => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        });
    }

    addNote(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error('Neither text or title should be empty!');
        }
        // Use UUID to create and assign new and unique id's.
        const newNote = { title, text, id: uuidv4() };

        // Retrieve Notes, add the new note, update notes
        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => newNote);
    }

    deleteNote(id) {
        return this.getNotes()
            .then(notes => notes.filter(note => note.id !== id))
            .then(filteredNotes => this.write(filteredNotes));
    }

}

module.exports = new SaveBoiler;