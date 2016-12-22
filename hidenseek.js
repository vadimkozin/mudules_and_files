const emptyDir = require('./lib').emptyDir;
const twoDigits = require('./lib').twoDigits;
const random = require('./lib').random;
const randomList = require('./lib').randomList;
const PokemonList = require('./pokemon').PokemonList;
const Pokemon = require('./pokemon').Pokemon;
const pokemons = require('./pokemons');


function hide(path, pokemonList) {
  let chain = Promise.resolve();
  let dirs = [];
  for (let i = 1; i <= 5; i++) {
    dirs.push(`${path}/data-${twoDigits(i)}`);
  }


  dirs.forEach(dir => {
    chain = chain
    .then(() => emptyDir(dir))
    .then(result => console.log(result))
    .catch(err => console.log(err));
  });

  //pokemonList.show();

// нужно спрятать не более 3 и не более чем передано
let  hideCount = Math.min(3,  pokemonList.length);
console.log(`нужно спрятать: ${hideCount}`);
// покемоны должны быть выбраны из списка случайным образом
const indexList = randomList(0, pokemonList.length - 1, hideCount);
// список отобранных пикемонов
const hideList = new PokemonList();
indexList.forEach ((v,i) => hideList[i] = pokemonList[v]);
hideList.show();

}
/*
rmdir('data-01')
.then(rmdir('data-02'))
.then(rmdir('data-02'))
.then(mkdir('data-01'))
.then(mkdir('data-02'))
.then(createFile('./data-02/test.txt', 'Привет Мир!'))
.catch(err => console.log(err));
*/


const path='./field';
const pok = new PokemonList();
require('./pokemons').forEach((item, i) => {
  pok.add(item.name, item.level);
});

hide(path, pok);

