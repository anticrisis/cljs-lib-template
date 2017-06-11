#!/usr/bin/env node
const s = require('shelljs');
const argv = require('minimist')(process.argv.slice(2));

function usage() {
    s.echo('Usage: ' + 'node build-release.js ' +
        'cljs.jar lib-name input-js --cd working-dir -h header -f footer -o out-file');
    s.exit(1);
}

if (argv._.length < 2 || !argv.hasOwnProperty('h') ||
    !argv.hasOwnProperty('h') || !argv.hasOwnProperty('o')) {
        usage();
}

const dir = argv.cd ? argv.cd + '/' : './';
const name = argv._[0];
const input = argv._[1];

s.exec('java -cp "' + dir + 'cljs.jar;src" clojure.main ' + dir + 'release.clj',
    function(code, stdout, stderr) {
        if (code === 0) {
            const regex = RegExp("s/LIB_NAME_JS/" + name + "/g");
            s.sed("LIB_NAME_JS", name, dir + argv.h).to(dir + "head.out");
            s.sed("LIB_NAME_JS", name, dir + argv.f).to(dir + "foot.out");
            s.cat(dir + "head.out", input, dir + "foot.out")
                .to(argv.o);
            s.rm(dir + "head.out", dir + "foot.out");
        } else {
            s.echo('Error: java failed.');
            s.exit(1);
        }
    });
