const { emptyDir, twoDigits, createFile, findFile, readFile, randomList } = require('./lib');
const PokemonList = require('./pokemon').PokemonList;

const countDir = 10;          // количество папок
const path ='./field';        // корневая папка, где прячем
const prefix = 'data-';       // начало в названии вложенных папок
const file = 'pokemon.txt';   // название файла для сохр. инфо о покемоне

function nameDirectory(i) {
  return `${path}/${prefix}${twoDigits(i)}`;
}

function hide(path, pokemonList) {
  return new Promise((resolve,reject) => {
    // нужно спрятать не более 3 и не более чем передано
    const  hideCount = Math.min(3,  pokemonList.length);
    // покемоны должны быть выбраны из списка случайным образом
    const hideList = randomList(0, pokemonList.length - 1, hideCount);
    // случайный список директорий для сохранения инфо о пикемоне
    const indexDir = randomList(0, countDir - 1, hideCount);

    let chain = Promise.resolve();

    for (let i = 0, n=0; i < countDir; i++) {
      let dir = nameDirectory(i);
      chain = chain
      .then(() => emptyDir(dir))
      .then(() => { 
        if (indexDir.indexOf(i) >- 1) {
          createFile(`${dir}/${file}`, pokemonList[hideList[n++]].json()); 
        }
      })
      .catch(err => { throw err });
    }

    chain.then(() => {
      resolve(pokemonList.filter((x, i) => hideList.indexOf(i) > -1));
    });
  });
}

function seek(path) {
  return new Promise((resolve,reject) => {
    let pokList = new PokemonList();
    let chain = Promise.resolve();

    for (let i = 0; i < countDir; i++) {
      let dir = nameDirectory(i);
      chain = chain
      .then(() => findFile(dir, file))
      .then(() => readFile(dir, file))
      .then(result => JSON.parse(result))
      .then(ob => pokList.add(ob.name, ob.level))      
      .catch(err => { 
        if (err.message !== 'no_error') {
           throw err; 
        }
      });
    }  

    chain.then(() => {
      resolve(pokList);
    });
  });
}

if (!module.parent) {
  let mode = 'hide';

  if (mode == 'hide') {
    const pok = new PokemonList();
    require('./pokemons').forEach((item, i) => {
      pok.add(item.name, item.level);
    });

    hide(path, pok)
    .then( result => result.show())
    .catch(err => console.log(err));
    }
  else {
    seek(path)
    .then (result => result.show())
    .catch(err => console.log(err));
  }
}

module.exports = {
    hide,
    seek
}