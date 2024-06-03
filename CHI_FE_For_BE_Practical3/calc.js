const savedValueKey = "savedValue";

let num_field = document.getElementById("num_field");

let calcData = {
    sign: null,
    temp1: 0,// first entered
    temp2: 0,// second entered
    mode: false,// false - temp1, true - temp2 write
    dot: false,// true - when . pressed
};

function num_concat(num) {
    if (num === '.') {
        if(!calcData.dot) {
            calcData.dot = true;
            if (num_field.innerHTML === '')
                num_field.innerHTML = "0.";
        }
        else {
            return;
        }
    }

    num_field.innerHTML += num;

    if (!calcData.mode)
        calcData.temp1 = parseFloat(num_field.innerHTML);
    else
        calcData.temp2 = parseFloat(num_field.innerHTML);
}

function clr() { // clear num_field
    num_field.innerHTML = '';
    calcData.mode = false;
    calcData.temp1 = 0;
    calcData.temp2 = 0;
    calcData.sign = null;
    calcData.dot = false;
}

function sign_press(new_sign) {
    calcData.sign = new_sign;
    calcData.dot = false;

    if (!calcData.mode)
    {
        calcData.mode = !calcData.mode;
        num_field.innerHTML = '';
    }
}

function enter() {
    switch(calcData.sign) {
        case '+':
            num_field.innerHTML = calcData.temp1 + calcData.temp2;
        break;
        case '-':
            num_field.innerHTML = calcData.temp1 - calcData.temp2;
        break;
        case '*':
            num_field.innerHTML = calcData.temp1 * calcData.temp2;
        break;
        case '/':
            num_field.innerHTML = calcData.temp1 / calcData.temp2;
        break;
    }

    calcData.mode = false;
    calcData.temp1 = parseFloat(num_field.innerHTML);

    if (calcData.temp1 % 1 !== 0) { // if float
        calcData.dot = true;
    }
    else {
        calcData.dot = false;
    }
}

function save_value() {
    if (num_field.innerHTML !== '') {
        localStorage.setItem(savedValueKey, num_field.innerHTML);
    } else {
        alert("Tried to save empty value and failed gracefully.");
    }

    console.log(`Saved to cache next value: ${savedValue}`)
}

function load_value() {
    num_field.innerHTML = '';
    let savedValue = localStorage.getItem(savedValueKey);

    if (savedValue.includes('.')) {
        calcData.dot = true;
    }
    num_concat(savedValue);

    console.log(`Loaded from cache next value: ${savedValue}`)
}