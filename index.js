const yargs = require('yargs');
const fs = require('fs');
const chalk = require('chalk');
const notes = require('./notes.js');

console.log(chalk.white.bgGreen.bold('start'));
// --------------------- add a notes

yargs.command({
  command: 'add',
  describe: 'Adding command',
  builder: {
    title: {
      describe: 'adding title to the notes',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'message body',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function (argv) {
    notes.addNotes(argv.title, argv.body);
  },
});
// ------------------- read notes
yargs.command({
  command: 'readNotes',
  describe: 'notes List command',
  builder: {
    title: {
      describe: 'message body',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function (argv) {
    notes.readNotes(argv.title);
  },
});

// -------------------update notes
yargs.command({
  command: 'notesList',
  describe: 'reading command',
  handler: function () {
    notes.notesList();
  },
});
// -------------------delete notes
yargs.command({
  command: 'remove',
  describe: 'reading command!',
  builder: {
    title: {
      describe: 'adding title to the notes',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function (argv) {
    notes.removeNote(argv.title);
  },
});
yargs.parse();
