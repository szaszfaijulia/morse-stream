const stream = require('stream');
const os = require('os');

const { Transform } = require('stream');

const morseMap = {
    'A': '.-',
    'B': '-...',
    'C': '-.-.',
    'D': '-..',
    'E': '.',
    'F': '..-.',
    'G': '--.',
    'H': '....',
    'I': '..',
    'J': '.---',
    'K': '-.-',
    'L': '.-..',
    'M': '--',
    'N': '-.',
    'O': '---',
    'P': '.--.',
    'Q': '--.-',
    'R': '.-.',
    'S': '...',
    'T': '-',
    'U': '..-',
    'V': '...-',
    'W': '.--',
    'X': '-..-',
    'Y': '-.--',
    'Z': '--..',
    '1': '.----',
    '2': '..---',
    '3': '...--',
    '4': '....-',
    '5': '.....',
    '6': '-....',
    '7': '--...',
    '8': '---..',
    '9': '----.',
    '0': '-----',
    ',': '--..--',
    '.': '.-.-.-',
    '?': '..--..',
    '/': '-..-.',
    '-': '-....-',
    '(': '-.--.',
    ')': '-.--.-',
    ' ': ' ',
    '\n': '\n',
    '\'': '.----.',
};
morseMap[os.EOL] = os.EOL;

const separator = "#";

const toMorse = new Transform({
  transform(chunk, encoding, callback){ //a transform metódusban alakítjuk át a chunk-ot
    this.push(chunk //push metódussal átadjuk a transform stream-nek az átalakított adatokat
      .toString()
      .split('')
      .map(i => morseMap[i])
      .join('#'));  //morze jelek elválasztása # karakterrel
    callback(); //callback-el jelezzük a transform stream-nek, hogy befejeztük a chunk feldolgozását
  }
})

const fromMorse = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk
      .toString()
      .split('#')
      .map(morse => Object
        .keys(morseMap)
        .find(i => morseMap[i] === morse))
      .join(''));
  callback();
  }
})

module.exports = {
    toMorse,
    fromMorse
}