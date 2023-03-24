'use strict';

let player1Score = 0;
let player2Score = 0;
let currentScore1 = 0;
let currentScore2 = 0;
let totalScore1 = 0;
let totalScore2 = 0;
let randomNumber = 0;

const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const dicePic = document.querySelector('.dice');

//roll the dice
function reroll() {
  randomNumber = Math.floor(Math.random() * 6 + 1);
}

//"New Game" button
newGame.addEventListener('click', function () {
  player1Score = 0;
  player2Score = 0;
  currentScore1 = 0;
  currentScore2 = 0;
  totalScore1 = 0;
  totalScore2 = 0;

  if (!player1.classList.contains('player--active')) {
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
  } else player2.classList.remove('player--active');

  document.querySelector('#current--0').innerHTML = currentScore1;
  document.querySelector('#current--1').innerHTML = currentScore2;
  document.querySelector('#score--0').innerHTML = totalScore1;
  document.querySelector('#score--1').innerHTML = totalScore2;
  dicePic.setAttribute('src', 'dice-1.png');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  rollDice.disabled = false;
  hold.disabled = false;
  document.querySelector('#name--0').innerHTML = 'PLAYER 1';
  document.querySelector('#name--1').innerHTML = 'PLAYER 2';
});

//"Roll Dice" button
rollDice.addEventListener('click', function () {
  if (player1.classList.contains('player--active')) {
    reroll();
    dicePic.setAttribute('src', 'dice-' + randomNumber + '.png');
    if (randomNumber === 1) {
      currentScore1 = 0;
      document.querySelector('#current--0').innerHTML = currentScore1;
      player1.classList.remove('player--active');
      player2.classList.add('player--active');
    } else {
      currentScore1 = currentScore1 + randomNumber;
      document.querySelector('#current--0').innerHTML = currentScore1;
    }
  } else if (player2.classList.contains('player--active')) {
    reroll();
    dicePic.setAttribute('src', 'dice-' + randomNumber + '.png');
    if (randomNumber === 1) {
      currentScore2 = 0;
      document.querySelector('#current--1').innerHTML = currentScore2;
      player1.classList.add('player--active');
      player2.classList.remove('player--active');
    } else {
      currentScore2 = currentScore2 + randomNumber;
      document.querySelector('#current--1').innerHTML = currentScore2;
    }
  }
});

//"Hold" Button
hold.addEventListener('click', function () {
  if (player1.classList.contains('player--active') && randomNumber !== 1) {
    totalScore1 = totalScore1 + currentScore1;
    document.querySelector('#score--0').innerHTML = totalScore1;
    player1.classList.remove('player--active');
    player2.classList.add('player--active');
    currentScore1 = 0;
    document.querySelector('#current--0').innerHTML = currentScore1;
    if (totalScore1 >= 50) {
      player1.classList.add('player--winner');
      rollDice.disabled = true;
      hold.disabled = true;
      document.querySelector('#name--0').innerHTML = 'WINNER!';
    }
  } else if (
    player2.classList.contains('player--active') &&
    randomNumber !== 1
  ) {
    totalScore2 = totalScore2 + currentScore2;
    document.querySelector('#score--1').innerHTML = totalScore2;
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
    currentScore2 = 0;
    document.querySelector('#current--1').innerHTML = currentScore2;
    if (totalScore2 >= 50) {
      player2.classList.add('player--winner');
      rollDice.disabled = true;
      hold.disabled = true;
      document.querySelector('#name--1').innerHTML = 'WINNER!';
    }
  }
});
