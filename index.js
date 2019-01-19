var nextNumber = document.getElementById("next-number");
var display = document.getElementById("display-pattern");
var result = document.getElementById("result");

var numbers = [];

// Array containing all random functions to be called. Function name must be included here
var randomFunctions = [addSquares, twiceAdded,subtractCube,cubedAdd,fibonacci];

function addSquares() {
    //Set first element as random number between 1 and 9
    var randomFirst = Math.floor(Math.random()*9)+1;
    // Push random number to array
    numbers.push(randomFirst);
    /*Write for loop sequence with number of elements that should be present in array 
    Note that the displayPattern function removes the last element of the array so the length should be the numbers you want displayed + 1
    i.e. if you want to display five numbers and the sixth number would be the one the user would be guessing, then you need to set i < 5*/
    for (var i = 0; i < 5; i++) {
        // Write function that returns number sequence according to formula
        numbers.push(numbers[i]+Math.pow([i+1],2))
    }
}

function twiceAdded() {
    var randomFirst = Math.floor(Math.random()*9)+1;
    numbers.push(randomFirst);
    for (var i = 0; i < 5; i++) {
        numbers.push((2*numbers[i])+(i+1))
    }
}

function subtractCube() {
    //Not all number sequences require the first value to be random. This one, for example, just uses the position to iterate through the function
    for (var i = 0; i < 5; i++) {
        numbers.push((Math.pow(i+1,3))-(i+1))
    }
}

function cubedAdd() {
    for (var i = 0; i < 5; i++) {
        numbers.push((Math.pow(i+1,3))+((i+2)*(i+3)));
    }
}

function fibonacci() {
    var randomFirst = Math.floor(Math.random()*9)+1;
    numbers.push(randomFirst);
    for (var i = 0; i < 5; i++) {
        if(i===0) {
            numbers.push(randomFirst+0)
        } else {
            numbers.push(numbers[i-1]+numbers[i])
        }
    }
}

const randomIndex = Math.floor(Math.random()*randomFunctions.length);
randomFunctions[randomIndex]();

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
    if (nextNumber.value == numbers[numbers.length-1]) {
        result.innerHTML = "You win!"
    } else {
        result.innerHTML = "Nope, try again"
    }
}