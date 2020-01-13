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
}

// let c;

// const bear = {
//     x: 0,
//     y: 0
// }



const board = [...document.querySelectorAll(".board div")];



// Funkcja losująca diva z bonem

const randomBone = () => {
    state.boneX = Math.floor(10 * Math.random())
    state.boneY = Math.floor(10 * Math.random())

};

// ustalanie pozycji bona i beara

const position = (a, b) => {
    return a + b * state.boardHeight
}

// renderowanie  bone i beara

const render = function () {
    for (let a = 0; a < board.length; a++) {
        board[a].classList.remove("bear")
    };
    let b = position(state.bearX, state.bearY)
    board[b].classList.add("bear");
    state.c = position(state.boneX, state.boneY)
    board[state.c].classList.add("bone");

};


// Funkcja GAME OVER - nieskończona 

const gameOver = () => {
    if (state.bearX < 0 || state.bearX > 9) {
        clearInterval(timer);
        document.querySelector("section").remove();
        document.querySelector(".end").style.display = "block"
    }
}

// pojedynczy koniec gry ze względu na oś Y

const gameEnd = () => {
    clearInterval(timer);
    document.querySelector("section").remove();
    document.querySelector(".end").style.display = "block"
}

// Funkcja odpowiedzialna za kierunek beara

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

// Funkcja odpowiedzialna za zmianę kierunku beara oraz ponowne jego wyrenderowanie

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
        gameEnd()
    }
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
    }
    gameOver()
};


const startGame = () => {
    randomBone();
    render()
}
const timer = setInterval(bearNewDirection, 200)


window.setTimeout(startGame, 200);
window.addEventListener("keydown", changeBearDirection);