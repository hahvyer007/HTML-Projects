//store all values from index.html
const numbers = document.querySelectorAll('.number');
const result = document.querySelector('.result span');
const operation = document.querySelectorAll('.operation');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const posneg = document.querySelector('.posneg');
const percent = document.querySelector('.percent');

//first user input
//NOTE: working with HTML (text)
let firstValue = "";
let isFirstValue = false;

//second user input
//NOTE: working with HTML (text)
let secondValue = "";
let isSecondValue = false;

//user-operation input
//NOTE: working with HTML (text)
let sign = "";

//final calculation
let resultValue = 0;

//iterate through all numbers
for(let i = 0; i < numbers.length; i++)
{
    //action occurred
    numbers[i].addEventListener('click', (e) =>
    {
        //obtain the int value of the HTML button clicked on
        let atr = e.target.getAttribute('value');

        //if there is no stored first value...
        if(isFirstValue === false)
        {
            //...store into first memory
            getFirstValue(atr)
        }

        //if there is no stored second value...
        if(isSecondValue === false)
        {
            //...store into second memory
            getSecondValue(atr)
        }
    })
}

//function to obtain first value
function getFirstValue(el)
{
    result.innerHTML = "";              //innerHTML gets or sets HTML markup contained within the element
    firstValue += el;                   //allow user to click numerous numbers
    result.innerHTML = firstValue;      //display value in HTML
    firstValue = +firstValue;           //store within code
}

//function to obtain second value
function getSecondValue(el)
{
    //continue if there is no present first value or sign awaiting
    if(firstValue != "" && sign != "")
    {
        secondValue += el;                  //allow user to click numerous numbers
        result.innerHTML = secondValue;     //display value in HTML
        secondValue = +secondValue;         //store within code
    }
}

//function to obtain operation
function getSign()
{
    //iterate through all possible operations
    for(let i = 0; i < operation.length; i++)
    {
        //action occurred
        operation[i].addEventListener('click', (e) =>
        {
            sign = e.target.getAttribute('value');  //obtain value of sign clicked on
            isFirstValue = true;                    //proceed with second value
        })
    }
}

getSign();  //call function

//equal function
equal.addEventListener('click', () =>
{
    //empty result HTML text
    result.innerHTML = "";
    
    //perform operation accordingly
    if(sign === "+")
    {
        resultValue = firstValue + secondValue;
    } else if(sign === "-")
    {
        resultValue = firstValue - secondValue;
    } else if(sign === "x")
    {
        resultValue = firstValue * secondValue;
    } else if(sign === "/")
    {
        resultValue = firstValue / secondValue;
    }

    //print result in HTML
    result.innerHTML = resultValue;

    //update firstValue to result for further operation
    firstValue = resultValue;

    //empty secondValue
    secondValue = "";

    //function to check length of result
    checkResultLength();
})

//function to check length of result
function checkResultLength()
{
    //obtain resultValue
    resultValue = JSON.stringify(resultValue);

    //if resultValue's length is greater than 8...
    if(resultValue.length >= 8)
    {
        //...parse value
        resultValue = JSON.parse(resultValue);

        //present result to five spaces
        result.innerHTML = resultValue.toFixed(5);
    }
}

//positive/negative function
posneg.addEventListener('click', () =>
{
    //empty result HTML text
    result.innerHTML = "";

    //verify firstValue isn't empty
    if(firstValue != "")
    {
        //flip sign of firstValue
        resultValue = -firstValue;
        firstValue = resultValue;
    }

    //verify there is some value already presented in the calculator
    if(firstValue != "" && secondValue != "" && sign != "")
    {
        //flip sign of resultValue
        resultValue = -resultValue;
    }

    //present result in HTML
    result.innerHTML = resultValue;
})

//percentange function
percent.addEventListener('click', () =>
{
    //empty HTML text
    result.innerHTML = "";

    //verify there is some value for firstValue
    if(firstValue != "")
    {
        //divide firstValue and store through double storage
        resultValue = firstValue / 100;
        firstValue = resultValue;
    }

    //verify there is some value already presented in the calculator
    if(firstValue != "" && secondValue != "" && sign != "")
    {
        //divide resultValue by 100
        resultValue = resultValue / 100;
    }

    //present result in HTML
    result.innerHTML = resultValue;
})

//clear calculator function
clear.addEventListener('click', () =>
{
    //present zero to calculator
    result.innerHTML = 0;

    //reset all values
    firstValue = "";
    isFirstValue = false;
    secondValue = "";
    isSecondValue = false;
    sign = "";
    resultValue = 0;
})