const { default: chalk } = require('chalk');
const fs = require('fs');

//--------------------------------- add notes to the file
exports.addNotes = async (title, body) => {
  const checkAlreadyNotes = loadNotes();
  const duplicateNotes = await checkAlreadyNotes.filter((value) => {
    return value.title === title;
  });
  if (duplicateNotes.length === 0) {
    checkAlreadyNotes.push({ title, body });
    saveNotes(checkAlreadyNotes);
  } else {
    return console.log(
      chalk.white.bgRed.bold('note already in the file add a new')
    );
  }
};

// ----------------------------- liast if titles of all notes
exports.notesList = async () => {
  console.log(chalk.white.bgGreen.bold('your notes'));
  const loadNotesFile = loadNotes();
  const notesTitle = loadNotesFile.map((val) => {
    return val.title;
  });
  console.log(notesTitle);
};

// ---------------------------------read a note by providing title
exports.readNotes = async (title) => {
  const loadNotesFile = loadNotes();
  const notesTitle = loadNotesFile.find((val) => {
    return val.title === title;
  });
  if (notesTitle) {
    console.log(chalk.white.bgGreen.bold.italic('Title:' + notesTitle.title));
    console.log('body:' + notesTitle.body);
  } else {
    console.log(
      chalk.white.bgRed.bold.italic('no note exist against this title')
    );
  }
};

//---------------------------------- remove a note by its title
exports.removeNote = async (title) => {
  const loadNotesFile = loadNotes();
  const removeNote = loadNotesFile.filter((val, index) => {
    if (val.title === title) {
      removeN(index);
    } else {
      return console.log(chalk.white.bgRed.bold('no file found to remove'));
    }
  });
  function removeN(i) {
    return loadNotesFile.splice(i, 1);
  }
  const json = JSON.stringify(loadNotesFile);
  fs.writeFileSync('notes.json', json);
};

//-------------- load notes that are already in the file
function loadNotes() {
  try {
    const notesExists = fs.readFileSync('notes.json');
    const bufferData = notesExists.toString();
    return JSON.parse(bufferData);
  } catch (error) {
    return [];
  }
}

//-------------- save notes to the file
function saveNotes(noteToSave) {
  const json = JSON.stringify(noteToSave);
  fs.writeFileSync('notes.json', json);
  console.log(chalk.white.bgGreen.bold.italic('new note is save to file'));
}
