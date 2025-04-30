const emojis  = ['❤️','🎁','🎀','💎','⚽️','🧁','🍇','🍔','🌸','🍄','🦋','🐯','💍','😈','🐝','🐸','🍀','🌻','❄️','🍌',
  '❤️','🎁','🎀','💎','⚽️','🧁','🍇','🍔','🌸','🍄','🦋','🐯','💍','😈','🐝','🐸','🍀','🌻','❄️','🍌',
]

const gameBoard = document.getElementById('gameBoard');
const flipSound = new Audio('flip.mp3');
const winSound = new Audio('winning.mp3');


let cards = [];
let flippedCards = [];
let lockBoard = false;
let matchCount = 0;
let confettiAnimationId = null;


function restartGame() {
  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = ''; // Clear board
  cards = [];
  flippedCards = [];
  matchCount = 0;
  lockBoard = false;
  document.getElementById('score').textContent = 'Matches: 0';
  createBoard();
}

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  
  const shuffled = shuffle(emojis.slice());

  shuffled.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.textContent = '';
    card.addEventListener('click', flipCard);
    cards.push(card);
    gameBoard.appendChild(card);
  });

  
}

function flipCard() {
  if (lockBoard || this.classList.contains('flipped')) return;

  flipSound.play(); // <-- Play sound as soon as player clicks
  this.classList.add('flipped');
  this.textContent = this.dataset.emoji;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.emoji === card2.dataset.emoji) {
    flippedCards = [];
    matchCount++;
    document.getElementById('score').textContent = `Matches: ${matchCount}`;

    // Win condition
    if (matchCount === emojis.length / 2) {
      setTimeout(() => alert("You won!"), 300);
      winSound.play();

      // win win fire fire
      var end = Date.now() + (15 * 400);

// go Buckeyes!
var colors = ['#bb0000', '#ffffff'];

(function frame() {
  confetti({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors
  });
  confetti({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
}());

    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = '';
      card2.textContent = '';
      flippedCards = [];
      lockBoard = false;
    }, 1000);
  }
}

createBoard();

