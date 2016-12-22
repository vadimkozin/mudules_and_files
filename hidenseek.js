const emptyDir = require('./lib').emptyDir;
const twoDigits = require('./lib').twoDigits;
const createFile = require('./lib').createFile;
const random = require('./lib').random;
const randomList = require('./lib').randomList;
const PokemonList = require('./pokemon').PokemonList;
const Pokemon = require('./pokemon').Pokemon;
const pokemons = require('./pokemons');

const file = 'pokemon.txt';

function hide(path, pokemonList) {
  return new Promise((resolve,reject) => {
    // нужно спрятать не более 3 и не более чем передано
    let  hideCount = Math.min(3,  pokemonList.length);
    // покемоны должны быть выбраны из списка случайным образом
    const hideList = randomList(0, pokemonList.length - 1, hideCount);
    // 10 папок
    const dirs = [];
    for (let i = 0; i < 10; i++) {
      dirs.push(`${path}/data-${twoDigits(i)}`);
    }
    // случайный список директорий для сохранения инфо о пикемоне
    const indexDir = randomList(0, dirs.length - 1, hideCount);

    let n = 0;
    let chain = Promise.resolve();
    dirs.forEach( (dir, i) => {
      chain = chain
      .then(() => emptyDir(dir))
      .then((result) => { 
        if (indexDir.indexOf(i) >- 1) {
          createFile(`${dir}/${file}`, pokemonList[hideList[n++]].info());
          return  `${dir}/${file}`;
        }
        return result;
      })
      //.then(result => console.log(result))
      .catch(err => { throw err });
    });

    resolve(pokemonList.filter((x, i) => { 
      return (hideList.indexOf(i) > -1)
    }));

  });
}

const path='./field';
const pok = new PokemonList();
require('./pokemons').forEach((item, i) => {
  pok.add(item.name, item.level);
});

hide(path, pok)
.then( result => result.show())
.catch(err => console.log(err));

