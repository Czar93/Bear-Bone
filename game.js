const position = {
    bear: 2,
    bone: 0
}

//Flag

let bearDirection = "right";

// Funkcja losująca diva z bonem

const randomBone = () => {
    const divNumber = document.querySelector(".board").childElementCount;

    const randomBoneDiv = Math.floor(Math.random() * (divNumber + 1));

    document.querySelector(`div:nth-child(${randomBoneDiv})`).classList.add("bone");
    position.bone = randomBoneDiv;
};

// Funkcja odpowiedzialna za kierunek beara

const changeBearDirection = (e) => {

    if (e.keyCode == 37) {
        bearDirection = "left"
    } else if (e.keyCode === 39) {
        bearDirection = "right"
    } else if (e.keyCode === 38) {
        bearDirection = "up"
    } else if (e.keyCode === 40) {
        bearDirection = "down"
    };
};

// Funkcja GAME OVER - nieskończona 

const loss = () => {
    if (position.bear <= 0 || position.bear >= 101) {
        document.querySelector(".board").remove()
        document.querySelector(".end").style.display = "block"
        clearInterval(interval)
    };
};

// Funkcja odpowiedzialna za ruch beara

const bearMove = () => {
    loss()
    document.querySelectorAll("div").forEach(div => {
        div.classList.remove("bear")
    });
    if (bearDirection === "right") {
        document.querySelector(`div:nth-child(${++position.bear})`).classList.add("bear");
    } else if (bearDirection === "left") {
        document.querySelector(`div:nth-child(${--position.bear})`).classList.add("bear");

    } else if (bearDirection === "up") {
        document.querySelector(`div:nth-child(${position.bear -= 10})`).classList.add("bear");
    } else if (bearDirection === "down") {
        document.querySelector(`div:nth-child(${position.bear += 10})`).classList.add("bear");
    }
    getScore();
}

// Funkcja odpowiedzialna za wyniki

const getScore = () => {
    if (position.bear === position.bone) {
        document.querySelectorAll("div").forEach(div => {
            div.classList.remove("bone");
        });
        randomBone();
        document.querySelector(".result span").textContent++;
    };
};

// Funkcja startująca grę

const startGame = () => {
    document.querySelector(`div:nth-child(${position.bear})`).classList.add("bear")
    randomBone()
};
const interval = setInterval(bearMove, 200)


window.setTimeout(startGame, 200);
window.addEventListener("keydown", changeBearDirection);