/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores,
    roundScore,
    activePlayer,
    gamePlaying,
    gameLimit;

gameLimit = 100;

// this will initilize the game when we start at first
init();

document.querySelector(".btn-roll").addEventListener("click", function () {
    if (gamePlaying) {
        var dice1, dice2;
        // in dice we will store a random number between 1 and 6
        rollDice();
        showDice();
        imgDiceUpdater();
        currentUpdater();
    }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
    if (gamePlaying) {
        // add current score the the player point
        scores[activePlayer] += roundScore;

        // update the UI
        document.querySelector("#score-" + activePlayer).textContent =
            scores[activePlayer];

        // check if the player won the game
        if (scores[activePlayer] >= gameLimit) {
            document.querySelector("#name-" + activePlayer).textContent =
                "winner!!!";
            hideDice();
            document
                .querySelector(".player-" + activePlayer + "-panel")
                .classList.add("winner");
            document
                .querySelector(".player-" + activePlayer + "-panel")
                .classList.remove("active");
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector(".final-score").addEventListener("change", function () {
    gameLimit = document.querySelector(".final-score").value;
    init();
});

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    // it will reset all the scores and the scoreboard and also will hide the dice from the user
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    hideDice();

    document.querySelector("#score-0").textContent = "0";
    document.querySelector("#score-1").textContent = "0";
    document.querySelector("#current-0").textContent = "0";
    document.querySelector("#current-1").textContent = "0";
    document.querySelector("#name-0").textContent = "Player 1";
    document.querySelector("#name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}

function nextPlayer() {
    // it will change the turn
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    roundScore = 0;
    document.querySelector("#current-0").textContent = "0";
    document.querySelector("#current-1").textContent = "0";
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    hideDice();
}

function hideDice() {
    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
}

function showDice() {
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
}

function rollDice() {
    // in dice we will store a random number between 1 and 6
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;
}

function imgDiceUpdater() {
    document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
    document.getElementById("dice-2").src = "dice-" + dice2 + ".png";
}

function currentUpdater() {
    if (dice1 !== 1 && dice2 !== 1) {
        // if the dice is opposite of 1 then we will update the UI
        roundScore += dice1 + dice2;
        document.querySelector(
            "#current-" + activePlayer
        ).textContent = roundScore;
    } else {
        // if its 1 then we will go to the nextPlayer
        nextPlayer();
    }
}
