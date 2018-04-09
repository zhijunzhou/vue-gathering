var path = require('path');

// console.log(path.resolve(__dirname, './build'))
const testFolder = path.resolve(__dirname, './build');
const fs = require('fs');

fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
})