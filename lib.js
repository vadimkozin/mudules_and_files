const fs = require('fs');
const fse = require('fs-extra');
const opts = { encoding: 'utf8' };

function emptyDir(path) {
  return new Promise((resolve,reject) => {
    fse.emptyDir(path, err => {
      if (err) throw err;
      resolve(path);
    });
  });
}

function mkdir(path) {
  return new Promise((resolve,reject) => {
    fs.mkdir(path, err => {
      if (err) throw err;
      resolve(path);    
    });
  });
}

function createFile(path, content) {
  return new Promise((resolve,reject) => {
    fs.writeFile(path, content, opts, err => {
      if (err) throw err;
      resolve(path);
    });
  });
}

function readFile(path, nameFile) {
  let file = `${path}/${nameFile}`;
  return new Promise((resolve,reject) => {
    fs.readFile(file, opts, (err, content) => {
      if(err) throw err;
      resolve(content);
    });
  }); 
}

function findFile__123(path, nameFile) {
  return new Promise((resolve,reject) => {
    console.log(`find in: ${path}`);
    fs.readdir(path, (err, files) => {
      console.log(`find file: ${nameFile}`);
      if(err) throw err;
      files.forEach(file => { 
        if (file === nameFile) {
          resolve(file);
        }
      });
    });
  })
}

function findFile(path, nameFile) {
  return new Promise((resolve,reject) => {
    //console.log(`find in: ${path}`);
    fs.readdir(path, (err, files) => {
      //console.log(`find file: ${nameFile}`);
      if(err) reject(err);
      files.forEach(file => { 
        if (file === nameFile) {
          resolve(file);
        } 
      });
      reject(new Error('no_error'));
    });
  })
}


function twoDigits(num) {
  return ('0' + num).slice(-2);
}

function random(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function randomList(min, max, count) {
    let arr = [];
    let i = 0;

    while (i < count) {
      do {
        var n = random(min, max);
      } while (arr.indexOf(n) > -1);
      arr.push(n);
      ++i;
    }

    return arr;
}

module.exports = {
    emptyDir,
    mkdir,
    createFile,
    findFile,
    readFile,
    twoDigits,
    random,
    randomList
}
