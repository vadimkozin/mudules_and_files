class Pokemon {
    constructor(name = '', level = 0) {
        this.name = name;
        this.level = level;
    }

    show() {
        console.log(` [name: '${this.name}' level: ${this.level}]`);
    }

    json() {
        return(`{"name": "${this.name}", "level": "${this.level}"}`);
    }

    valueOf() {
        return this.level;
    }
}

class PokemonList extends Array {
    constructor (...items) {
        super();
        items.forEach(ob => this.push(ob));
    }

    add(name = '', level = 0) {
        this.push(new Pokemon(name, level));
    }

    show() {
        console.log(`[ pokemons in list: ${this.length} ]:`);
        this.forEach(ob => ob.show());
    }
  
    exist(name) {
        return (this.indexOf(name) > -1) ? true : false;
    }

    del(name) {
        let index = this.indexOf(name);
        if (index > -1) {
            let deletedItem = this[index];
            this.splice(index, 1);
            return deletedItem;
        }
        return null;
    }

    indexOf(name) {  
        for (let i = 0; i < this.length; i++) {
            if (name === this[i].name) {
                return i;
            }
        }

        return -1;
    }
    
    max() {
        const maxLevel = Math.max(...this);
        return this.filter(ob => ob.level == maxLevel);
    }
}

// перемещение объекта с именем name из from в to
function movePokemon(name, from, to) {
    if (from.exist(name)) {
        let delItem = from.del(name);    
        if (!to.exist(name)) {
            to.add(delItem.name, delItem.level);       
        }
    }

}

module.exports = {
    Pokemon,
    PokemonList
}

if (!module.parent) {
// создаём два списка
const fox = 'лиса';
const bear = 'медведь';
let lost = new PokemonList(new Pokemon('заяц', 10), new Pokemon(fox, 20), new Pokemon('волк', 33), new Pokemon('лось', 33));
let found = new PokemonList(new Pokemon('синица', 1), new Pokemon('снегирь', 25), new Pokemon('дятел', 3));

lost.show();

console.log(`// добавляем объект '${bear}' и удаляем '${fox}'`);
lost.add(bear, 4);
lost.del(fox);
lost.show();

console.log ('-----------------');

console.log(`// перемещаем объект '${bear}' из 'lost' в 'found'`);
movePokemon('медведь', lost, found );
lost.show();
found.show();

console.log('.');

console.log('// доп.задание - найти объект(ы) максимального уровня:');
lost.max().show();
found.max().show();

//console.log(`// возвращает только максимальный уровень: ${Math.max(...lost)}`);
console.log('.');

}
