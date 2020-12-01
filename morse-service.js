const stream = require('stream');
const os = require('os');

const { Transform } = require('stream');

const morseMap = {  //object, összerendeli a morze jeleket a karakterekkel
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
      .toString() //sztringgé alakítja a chunk-ot
      .split('')  //szétválasztja a sztringet, tömbként adja vissza
      .map(i => morseMap[i])  //a paraméterül kapott transzformáló függvényt alkalmazza a tömb minden elemére, a transzformált elemek tömbjével tér vissza
      .join('#'));  //a tömb elemeinek (morze jelek) összekapcsolása # karakterrel
    callback(); //callback-el jelezzük a transform stream-nek, hogy befejeztük a chunk feldolgozását
  }
})

const fromMorse = new Transform({
  transform(chunk, encoding, callback) {  //chunk átalakítása
    this.push(chunk //átadjuk a transform stream-nek az átalakított adatokat
      .toString() //sztringé alakítja a chunk-ot
      .split('#') //tömbként adja vissza a szétválasztott sztringet
      .map(morse => Object  //transzformált elemek tömbjével tér vissza
        .keys(morseMap) //morseMap objectben lévők neveit adja vissza
        .find(i => morseMap[i] === morse))  //megkeresi az adott morze jelet a morseMap-ben
      .join('')); //összekapcsolja a tömb elemeit
  callback(); //chunk felfolgozásának befejezése
  }
})

module.exports = {
    toMorse,  //readable stream-et kap, a karaktereket átalakítja morze jelekké
    fromMorse //readable stream-et kap, a morze jeleket visszaalakítja betűkké
}