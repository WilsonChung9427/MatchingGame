/*
Matching Card Game
1. Player flips 2 cards, checks the cards, if it matches it will stay on screen, if it does not match it will flip over
2. Show a "You Win!" alert only when all cards are matched
*/

const gameBoard = document.querySelector("#game-board");
const restartBtn = document.querySelector("#restartGame");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCount = 0;

function startGame() {
    resetBoard();
    createCards();
}

function resetBoard() {
    gameBoard.innerHTML = "";
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matchedCount = 0;
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function createCards() {
    const numbers = [];
    for (let i = 1; i <= 10; i++) {
        numbers.push(i, i);
    }

    numbers.sort(() => Math.random() - 0.5);

    numbers.forEach(num => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = num;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this.classList.contains("flipped") || this.classList.contains("matched")) return;

    this.classList.add("flipped");
    this.textContent = this.dataset.value;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkMatch();
    }
}

function checkMatch() {
    if (!firstCard || !secondCard) return;

    const isMatch = firstCard.dataset.value === secondCard.dataset.value;

    if (isMatch) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedCount += 2;
        resetTurn();

        if (matchedCount === 20) {
            alert("You Win!");
        }

    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard.textContent = "";
            secondCard.textContent = "";
            resetTurn();
        }, 500);
    }
}

restartBtn.addEventListener("click", startGame);

startGame();
