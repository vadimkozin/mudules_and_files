const { hide, seek } = require('./hidenseek');
const { exit } =  require('process');
const { basename }  = require('path');

const bname = basename(process.argv[1]);
const [do_hide, do_seek] = ['hide', 'seek'];

const help = `used:
    node ${bname} ${do_hide} path data.json
    node ${bname} ${do_seek} path
example:
    node ${bname} ${do_hide} ./field ./pokemons.json
    node ${bname} ${do_seek} ./field 
`;

//console.log(process.argv);
const prog = process.argv[1];
const what_do = process.argv[2];
const path = process.argv[3];

//console.log(prog);


if ([do_hide, do_seek].indexOf(what_do) == -1 || !path) {
    console.log(help);
    exit(1);
}

switch (what_do) {
    case 'hide':
        break;
    case 'seek':
        break;
    default:
        //console.log(help);
        break;
} 




