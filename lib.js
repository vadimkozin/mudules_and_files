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
    twoDigits,
    random,
    randomList
}
