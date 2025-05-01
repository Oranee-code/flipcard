const emojis = [
  '❤️',
  '🎁',
  '🎀',
  '💎',
  '⚽️',
  '🧁',
  '🍇',
  '🍔',
  '🌸',
  '🍄',
  '🦋',
  '🐯',
  '💍',
  '😈',
  '🐝',
  '🐸',
  '🍀',
  '🌻',
  '❄️',
  '🍌',
  '❤️',
  '🎁',
  '🎀',
  '💎',
  '⚽️',
  '🧁',
  '🍇',
  '🍔',
  '🌸',
  '🍄',
  '🦋',
  '🐯',
  '💍',
  '😈',
  '🐝',
  '🐸',
  '🍀',
  '🌻',
  '❄️',
  '🍌',
]

const gameBoard = document.getElementById('gameBoard')
const flipSound = new Audio('flip.mp3')
const winSound = new Audio('winning.mp3')

let cards = []
let flippedCards = []
let lockBoard = false
let matchCount = 0
let confettiAnimationId = null
let timerInterval // add timer
let secondsElapsed = 0
let timerStarted = false

function startTimer() {
  timerInterval = setInterval(() => {
    secondsElapsed++
    document.getElementById('timer').textContent =
      'Time: ' + formatTime(secondsElapsed)
  }, 1000)
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

function restartGame() {
  stopTimer() // Stop timer before resetting
  gameBoard.innerHTML = ''
  cards = []
  flippedCards = []
  matchCount = 0
  lockBoard = false
  timerStarted = false
  secondsElapsed = 0

  document.getElementById('score').textContent = 'Matches: 0'
  document.getElementById('timer').textContent = 'Time: 00:00'

  createBoard()
}

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random())
}

function createBoard() {
  const shuffled = shuffle(emojis.slice())

  shuffled.forEach((emoji, index) => {
    const card = document.createElement('div')
    card.classList.add('card')
    card.dataset.emoji = emoji
    card.dataset.index = index
    card.textContent = ''
    card.addEventListener('click', flipCard)
    cards.push(card)
    gameBoard.appendChild(card)
  })
}

function flipCard() {
  if (lockBoard || this.classList.contains('flipped')) return

  if (!timerStarted) {
    timerStarted = true
    startTimer()
  }

  flipSound.play()
  this.classList.add('flipped')
  this.textContent = this.dataset.emoji
  flippedCards.push(this)

  if (flippedCards.length === 2) {
    checkMatch()
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards

  if (card1.dataset.emoji === card2.dataset.emoji) {
    flippedCards = []
    matchCount++
    document.getElementById('score').textContent = `Matches: ${matchCount}`

    if (matchCount === emojis.length / 2) {
      stopTimer()
      setTimeout(() => alert('You won!'), 300)
      winSound.play()

      // confetti
      const end = Date.now() + 15 * 400
      const colors = ['#bb0000', '#ffffff']

      ;(function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        })
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        })
        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      })()
    }
  } else {
    lockBoard = true
    setTimeout(() => {
      card1.classList.remove('flipped')
      card2.classList.remove('flipped')
      card1.textContent = ''
      card2.textContent = ''
      flippedCards = []
      lockBoard = false
    }, 800)
  }
}

createBoard()
