// Переворот карточек по нажатию  и проверка пары

let card = document.querySelectorAll(".card");
let result = document.querySelector(".result__attempts");
let attempts = 0;
let arr = [];

function removeClass (element) {
    element.firstElementChild.classList.remove("flipped-front");
    element.lastElementChild.classList.remove("flipped-back");
}

function checkResult(arr) {
    if (arr[0].dataset.type == arr[1].dataset.type){
        arr.forEach(element => element.classList.add("hidden"));
    } else {
        arr.forEach(element => {
            setTimeout(removeClass, 900, element);
        });
    }
}

function reverse() {
    if (arr.length == 2) {
        arr.length = 0;
    }
    if (arr.length == 1) {
        if (this == arr[0]){
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
        checkResult(arr);
        result.innerHTML = attempts += 1;
    }
}

card.forEach(el => el.addEventListener('click', reverse))





