let num_field = document.getElementById("num_field");

let calcData = {
    sign: null,
    temp1: 0,// first entered
    temp2: 0,// second entered
    mode: false,// false - temp1, true - temp2 write
    dot: 0,// 1 - when . pressed
};

function num_concat(num)
{
    if (num == '.')
    {
        if(calcData.dot == 0)
        {
            calcData.dot = 1;
            if (num_field.innerHTML == '')
                num_field.innerHTML = "0.";
        }
        else
        {
            return;
        }
    }

    num_field.innerHTML += num;

    if (!calcData.mode)
        calcData.temp1 = parseFloat(num_field.innerHTML);
    else
        calcData.temp2 = parseFloat(num_field.innerHTML);
}

function clr()// clear num_field
{
    num_field.innerHTML = '';
    calcData.mode = false;
    calcData.temp1 = 0;
    calcData.temp2 = 0;
    calcData.sign = null;
    calcData.dot = 0;
}

function sign_press(new_sign)
{
    calcData.sign = new_sign;
    calcData.dot = 0;

    if (!calcData.mode)
    {
        calcData.mode = !calcData.mode;
        num_field.innerHTML = '';
    }
}

function enter()
{
    switch(calcData.sign)
    {
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

    if (calcData.temp1 % 1 !== 0)// if float
    {
        calcData.dot = 1;
    }
    else
    {
        calcData.dot = 0;
    }
}