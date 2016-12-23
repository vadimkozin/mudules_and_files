function hide_(path, pokemonList) {
  return new Promise((resolve,reject) => {
    // нужно спрятать не более 3 и не более чем передано
    let  hideCount = Math.min(3,  pokemonList.length);
    // покемоны должны быть выбраны из списка случайным образом
    const hideList = randomList(0, pokemonList.length - 1, hideCount);
    // 10 папок
    const dirs = [];
    for (let i = 0; i < countDir; i++) {
      dirs.push(`${path}/${prefix}${twoDigits(i)}`);
    }
    // случайный список директорий для сохранения инфо о пикемоне
    const indexDir = randomList(0, countDir - 1, hideCount);

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
///
function seek(path) {
  
  return new Promise((resolve,reject) => {
    let pokList = new PokemonList();
    
    for (let i = 0; i < countDir; i++) {
      let dir = nameDirectory(i);
      //console.log(`find: ${dir}`);
      Promise.resolve()
      .then(() => findFile(dir, file))
      //.then(result => { console.log(result); return result;} )
      .then(result => readFile(dir, file))
      //.then(result => { console.log(JSON.parse(result)); return JSON.parse(result)})
      .then(result => JSON.parse(result))
      .then(ob => { 
        console.log(ob.name, ob.level);
        pokList.add(ob.name, ob.level);
        //pokList.show(); 
      })
      //.then(result => console.log(result))
      .catch(err => { throw err });
    }

    pokList.show();
    resolve(pokList);

  });
}

const path='./field';
const pok = new PokemonList();
require('./pokemons').forEach((item, i) => {
  pok.add(item.name, item.level);
});

/*
hide(path, pok)
.then( result => result.show())
.catch(err => console.log(err));

console.log("...");
*/

seek(path)
//.then(result => console.log(result))
.then (result => result.show())
.catch(err => console.log(err));
