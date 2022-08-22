const cards = document.querySelectorAll(".card");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let p1Score = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  if (isMatch) {
    disableCards();
    showP1Score();

    if (p1Score == cards.length / 2) {
      const p = document.createElement("p");
      p.innerHTML = "Good job, you won!";
      document.body.append(p);
    }
  } else {
    unflipCards();
  }
}

function showP1Score() {
  p1Score += 1;
  document.getElementById("p1score").innerHTML = p1Score;
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
