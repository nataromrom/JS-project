const arr = [];
const arrSize = 2;
const startButton = document.querySelector('button');
let k = 0;


document.addEventListener("DOMContentLoaded", function (event) {

    for (let i = 1; i <= arrSize; i++) {
        arr.push(i);
        arr.push(i);
    }
});
startButton.onclick = function () {
    k = 0;
    resetWatch();
    document.querySelector(".game__block").style.display = 'block';
    shuffle(arr);
    addContent();
    gameStart();
}

// Перемешивание карточек
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Добавление карточек
function addContent() {
    let cardContent = "";

    for (let i of arr) {

        cardContent +=
            `<div class="game__item card" data-type="${i}">
                    <div class="card__front">
                        <div class="card__front-img">
                            <img src="src/img/cover.jpg" alt="img-cover">
                        </div>
                    </div>
                    <div class="card__back">
                        <div class="card__back-img">
                            <img src="src/img/${i}.webp" alt="animal">
                        </div>
                    </div>
                </div>`;
    }
    document.querySelector(".game__content").innerHTML = cardContent;
    let container = document.querySelector(".game__content")
    let card = document.querySelectorAll(".card")
    switch (arrSize) {
        case 6:
            card.forEach(el => el.classList.add("small"));
            container.classList.add("sm-container")
            break;

        case 8:
            card.forEach(el => el.classList.add("medium"));
            container.classList.add("md-container")
            break;

        case 10:
            card.forEach(el => el.classList.add("large"));
            container.classList.add("lg-container")
            break;
    }
}

// Переворот карточек по нажатию

function gameStart() {
    let card = document.querySelectorAll(".card");
    let result = document.querySelector(".result__attempts");
    let attempts = 0;
    let arr = [];
    result.innerHTML = " ";

    function reverse() {
        startWatch();
        if (arr.length == 2) {
            arr.length = 0;
        }
        if (arr.length == 1) {
            if (this == arr[0]) {
                return;
            }
        }
        if (this.classList.contains("hidden")) {
            return;
        }

        this.firstElementChild.classList.add("flipped-front");
        this.lastElementChild.classList.add("flipped-back");

        arr.push(this);
        if (arr.length == 2) {
            checkResult(arr, k);
            result.innerHTML = attempts += 1;
        }
    }
    card.forEach(el => el.addEventListener('click', reverse));
}

// проверка одинаковые ли карточки
function checkResult(arr) {
    if (arr[0].dataset.type == arr[1].dataset.type) {
        arr.forEach(element => element.classList.add("hidden"));
        k += 1;
        if (k == arrSize) {
            pauseWatch();
            setTimeout(showWinTable, 900);
        }
    } else {
        arr.forEach(element => {
            setTimeout(removeClass, 900, element);
        });
    }
}
// обратный переворот карточек если не совпали
function removeClass(element) {
    element.firstElementChild.classList.remove("flipped-front");
    element.lastElementChild.classList.remove("flipped-back");
}


// Вывод таблицы победителей

function showWinTable() {
    document.querySelector(".game__content").innerHTML =
        `<div class="game__table">
                <h2>Ура!</h2>
            </div>`
    document.querySelector(".game__block").style.display = 'none';
}
// Секундомер
const watch = document.querySelector('#watch');
let milliseconds = 0;
let timer;

const startWatch = () => {
    watch.classList.remove('paused');
    clearInterval(timer);
    timer = setInterval(() => {
        milliseconds += 10;
        let dateTimer = new Date(milliseconds); 
        watch.innerHTML =
            ('0' + dateTimer.getUTCHours()).slice(-2) + ':' +
            ('0' + dateTimer.getUTCMinutes()).slice(-2) + ':' +
            ('0' + dateTimer.getUTCSeconds()).slice(-2) + ':' +
            ('0' + dateTimer.getUTCMilliseconds()).slice(-3, -1);
    }, 10);
};

const pauseWatch = () => {
    watch.classList.add('paused');
    clearInterval(timer);
};

const resetWatch = () => {
    watch.classList.remove('paused');
    clearInterval(timer);
    milliseconds = 0;
    watch.innerHTML = '00:00:00:00';
    shuffle(arr);
    addContent();
    gameStart();
};

document.addEventListener('click', (e) => {
    const element = e.target;
    if (element.id === 'pause') pauseWatch();
    if (element.id === 'reset') resetWatch();
});