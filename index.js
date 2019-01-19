var nextNumber = document.getElementById("next-number");
var display = document.getElementById("display-pattern");
var result = document.getElementById("result");

var numbers = [];

var randomFunctions = [add, multiply, even];

function add(num1, num2) {
    return num1 +  num2;
}

function multiply(num1,num2) {
    return num1 *  num2;
}

function even(num1, num2) {
    return 2*(num1-num2)
}

function power(num1, num2) {
    return Math.pow(num1, num2)
}

function assignValues(randomFunction) {
    var randomFirst = Math.floor(Math.random()*9);
    numbers.push(randomFirst);
    for (var i = 0; i < 4; i++) {
        if (i===0) {
            if (randomFunction(numbers[i], 0) == 0) {
                numbers.push(randomFunction(numbers[i], 1))
            } else {
                numbers.push(randomFunction(numbers[i], 0))
            }
        }
        numbers.push(randomFunction(numbers[i], numbers[i+1]))
    }
}

assignValues(randomFunctions[Math.floor(Math.random()*randomFunctions.length)]);

function createSpan(element) {
    var span = document.createElement("span")
    span.innerHTML = element;
    display.appendChild(span);
}

function displayPattern() {
    numbers.slice(0,-1).map(element => createSpan(element));
}

displayPattern();

function guess() {
    if (nextNumber.value == numbers[5]) {
        result.innerHTML = "You win!"
    } else {
        result.innerHTML = "Nope, try again"
    }
}