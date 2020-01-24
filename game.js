const state = {
    boardHeight: 10,
    boardWidth: 10,
    bearX: 0,
    bearY: 0,
    boneX: 0,
    boneY: 0,
    bearDirection: "right",
    score: 0,
    c: 0
};
const board = [...document.querySelectorAll(".board div")];

// Function rensponsible for randomizing position of "bone"

const randomBone = () => {
    state.boneX = Math.floor(10 * Math.random())
    state.boneY = Math.floor(10 * Math.random())

};

// Function responsible for position "bear" and "bone"

const position = (a, b) => {
    return a + b * state.boardHeight
};

// Function responsible for rendering "bear" and "bone"

const render = function () {
    for (let a = 0; a < board.length; a++) {
        board[a].classList.remove("bear")
    };
    let b = position(state.bearX, state.bearY)
    board[b].classList.add("bear");
    state.c = position(state.boneX, state.boneY)
    board[state.c].classList.add("bone");

};

// Function responsible for ending the game

const gameOver = () => {
    if (state.bearX < 0 || state.bearX > 9 || state.bearY < 0 || state.bearY > 9) {
        clearInterval(timer);
        document.querySelector("section").remove();
        document.querySelector(".end").style.display = "block"
    };
};

// Function responsible for bear movement

const changeBearDirection = (e) => {

    if (e.keyCode === 37) {
        state.bearDirection = "left"
    } else if (e.keyCode === 39) {
        state.bearDirection = "right"
    } else if (e.keyCode === 38) {
        state.bearDirection = "up"
    } else if (e.keyCode === 40) {
        state.bearDirection = "down"
    };

};

// Function responsible for changing a direction of "bear" and it randering

const bearNewDirection = () => {
    if (state.bearDirection === "left") {
        state.bearX--
    } else if (state.bearDirection === "right") {
        state.bearX++
    } else if (state.bearDirection === "up") {
        state.bearY--
    } else if (state.bearDirection === "down") {
        state.bearY++
    }
    for (let a = 0; a < board.length; a++) {
        board[a].classList.remove("bear")
    };
    let b = position(state.bearX, state.bearY)
    if (state.bearY < 0 || state.bearY > 9) {
        gameOver()
    };
    board[b].classList.add("bear");

    if (b === state.c) {
        state.score++
        for (let a = 0; a < board.length; a++) {
            board[a].classList.remove("bone")
        };
        randomBone();
        state.c = position(state.boneX, state.boneY)
        board[state.c].classList.add("bone");
        document.querySelector(".score").textContent = state.score
    };
    gameOver();
};

// Function responsible for starting the game

const startGame = () => {
    randomBone();
    render();
};

const timer = setInterval(bearNewDirection, 150);

window.setTimeout(startGame, 150);
window.addEventListener("keydown", changeBearDirection);