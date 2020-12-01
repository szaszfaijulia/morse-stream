const morseService = require('./morse-service.js');
const fs = require('fs');

const readStream = fs.createReadStream('./star-wars-opening-crawl.txt'); //fájl tartalmát kiolvasó stream létrehozása
const writeStream = fs.createWriteStream('./star-wars-opening-crawl.morse'); //fájlba író stream létrehozása
readStream.pipe(morseService.toMorse).pipe(writeStream);

readStream.on('end', () => {  //(EventEmitter,) eseménykezelő definiálása
    const morseReadStream = fs.createReadStream('./star-wars-opening-crawl.morse');
    const backWriteStream = fs.createWriteStream('./star-wars-opening-crawl.morse-back');
    morseReadStream.pipe(morseService.fromMorse).pipe(backWriteStream);
});