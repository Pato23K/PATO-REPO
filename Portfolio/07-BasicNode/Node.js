import { readFileSync } from 'fs';
import swQuotes from 'star-wars-quotes';
import { randomSuperhero } from 'superheroes';
import { randomSupervillain } from 'supervillains';

console.log("Hello, World!");
console.log(swQuotes());

const sup = randomSuperhero();
const vil = randomSupervillain();

console.log(`${sup} VS ${vil}, LET THE BATTLE BEGIN!!!`);

const data = readFileSync('data/input.txt', 'utf-8');
console.log(data);
