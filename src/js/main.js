const arr = [];
const arrTwo = [];
const arrSize = 3;
let attempts = 0;
const startButton = document.querySelector('button');
const result = document.querySelector(".result__attempts");
let k = 0;
const watch = document.querySelector('#watch');
const userName = "Наташа";
const gameLevel = "Легкий";

document.addEventListener("DOMContentLoaded", function (event) {

    for (let i = 1; i <= arrSize; i++) {
        arr.push(i);
        arr.push(i);
    }
});
startButton.onclick = function () {
    clearResults();
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
    result.innerHTML = " ";
    card.forEach(el => el.addEventListener('click', reverse));
}

//Переворот карточек
function reverse() {
    startWatch();
    if (arrTwo.length == 2) {
        arrTwo.length = 0;
    }
    if (arrTwo.length == 1) {
        if (this == arrTwo[0]) {
            return;
        }
    }
    if (this.classList.contains("hidden")) {
        return;
    }
    this.firstElementChild.classList.add("flipped-front");
    this.lastElementChild.classList.add("flipped-back");
    arrTwo.push(this);
    if (arrTwo.length == 2) {
        result.innerHTML = attempts += 1;
        checkResult(arrTwo, k);
    }
}

// Проверка одинаковые ли карточки
function checkResult(arr) {
    if (arr[0].dataset.type == arr[1].dataset.type) {
        arr.forEach(element => element.classList.add("hidden"));
        k += 1;
        if (k == arrSize) {
            pauseWatch();
            let gameTime = watch.innerHTML;
            let gameResult = document.querySelector(".result__attempts").innerHTML;
            setTimeout(showWinTable, 900, gameTime, gameResult);
        }
    } else {
        arr.forEach(element => {
            setTimeout(removeClass, 900, element);
        });
    }
}

// Обратный переворот карточек если не совпали
function removeClass(element) {
    element.firstElementChild.classList.remove("flipped-front");
    element.lastElementChild.classList.remove("flipped-back");
}

// Вывод таблицы победителей
function showWinTable(gameTime, gameResult) {
    document.querySelector(".game__content").innerHTML =
        `<div class="game__table">
            <table class="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Имя</th>
                        <th>Время</th>
                        <th>Количество попыток</th>
                        <th>Уровень сложности</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td scope="row">1</td>
                        <td>${userName}</td>
                        <td>${gameTime}</td>
                        <td>${gameResult}</td>
                        <td>${gameLevel}</td>
                    </tr>
                </tbody>
            </table>
        </div>`
    document.querySelector(".game__block").style.display = 'none';
}

//Очистить результаты
function clearResults(){
    arrTwo.length = 0;
    attempts = 0;
    k = 0;
}

// Секундомер
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
    clearResults();
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