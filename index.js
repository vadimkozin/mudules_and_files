const { basename }  = require('path');
const { hide, seek } = require('./hidenseek');
const { PokemonList } = require('./pokemon');

const [ , prog, what_do, path, data ] = [ ...process.argv ];
const bname = basename(prog);
const [ do_hide, do_seek ] = [ 'hide', 'seek' ];
 
const help = `used:
    node ${bname} ${do_hide} path data.json
    node ${bname} ${do_seek} path
example:
    node ${bname} ${do_hide} ./field ./pokemons.json
    node ${bname} ${do_seek} ./field 
`;

if ([do_hide, do_seek].indexOf(what_do) == -1 || !path) {
    console.log(help);
    process.exit(1);
}

switch (what_do) {
    case 'hide':
        const pok = new PokemonList();
        try {
            require(data).forEach((item, i) => {
                pok.add(item.name, item.level);
            });
        }
        catch (err) {
            console.log(`Cannot find file: '${data}'`);
            process.exit(1);
        }

        hide(path, pok)
        .then( result => result.show())
        .catch(err => console.log(err));
        break;

    case 'seek':
        seek(path)
        .then (result => result.show())
        .catch(err => console.log("ERROR: " + err));
        break;

    default:
        console.log(help);
        break;
} 

