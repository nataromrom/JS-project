document.addEventListener("DOMContentLoaded", function (event) {

    let arr = [];

    let arrSize = 5;

    for (let i = 1; i <= arrSize; i++) {
        arr.push(i);
        arr.push(i);
    }

    document.querySelector('button').onclick = function () {
        shuffle(arr);
        addContent();
    }

    // Перемешивание карточек
    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

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
    };

    document.addEventListener('click', (e) => {
        const element = e.target;
        if (element.id === 'start') startWatch();
        if (element.id === 'pause') pauseWatch();
        if (element.id === 'reset') resetWatch();
    });

});


