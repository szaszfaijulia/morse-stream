const morseService = require('./morse-service.js');
const fs = require('fs');

const readStream = fs.createReadStream('./star-wars-opening-crawl.txt');
const writeStream = fs.createWriteStream('./star-wars-opening-crawl.morse');
readStream.pipe(morseService.toMorse).pipe(writeStream);

readStream.on('end', () => {
    const morseReadStream = fs.createReadStream('./star-wars-opening-crawl.morse');
    const backWriteStream = fs.createWriteStream('./star-wars-opening-crawl.morse-back');
    morseReadStream.pipe(morseService.fromMorse).pipe(backWriteStream);
});