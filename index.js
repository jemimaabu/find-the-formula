var nextNumber = document.getElementById("next-number");
var display = document.getElementById("display-pattern");
var result = document.getElementById("result");

/** The hint value shows up after the user has tried a sequence more than 3 times, if the function assigns a value to it */
var hint = document.getElementById("hint");
var tries = 0;

/** The numbers array gets its values from whichever function is called */
var numbers = [];

/**  Array containing all random functions to be called. Function name must be included here */
var randomFunctions = [addSquares, twiceAdded,subtractCube,cubedAdd,fibonacci];

/** Define your functions here */
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
    //Assign a value to 'hint' if you want to provide a hint, if not leave it blank
    hint.innerHTML="Think of squares"
}

function twiceAdded() {
    var randomFirst = Math.floor(Math.random()*9)+1;
    numbers.push(randomFirst);
    for (var i = 0; i < 5; i++) {
        numbers.push((2*numbers[i])+(i+1))
    }
}

function subtractCube() {
    var randomFirst = Math.floor(Math.random()*3)+1;
    //This function is a different pattern than the rest as it uses the index position to iterate rather than a value
    for (i = randomFirst; i < randomFirst+5; i++) {
        numbers.push((Math.pow(i+1,3))-(i+1))
    }
    hint.innerHTML = "Try raising to the 3rd power"
}

function cubedAdd() {
    var randomFirst = Math.floor(Math.random()*3)+1;
    for (i = randomFirst; i < randomFirst+5; i++) {
        numbers.push((Math.pow(i+1,3))+((i+2)*(i+3)));
    }
    hint.innerHTML = "Think of cubes"
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

// Calls the random function and assigns the values in the numbers array
function callRandomFunction() {
    const randomIndex = Math.floor(Math.random()*randomFunctions.length);
    randomFunctions[randomIndex]();
}
callRandomFunction();

// Defines the element for creating a span element
function createSpan(element) {
    var span = document.createElement("span")
    span.innerHTML = element;
    display.appendChild(span);
}

// Removes the last element of the array and uses mapping to display the rest in span elements
function displayPattern() {
    numbers.slice(0,-1).map(element => createSpan(element));
}

displayPattern();

// Checks the users input against the last (hidden) element in the array
function guess() {
    tries++;
    if (nextNumber.value == numbers[numbers.length-1]) {
        result.innerHTML = "You win!";
        hint.innerHTML = "";
        setTimeout(function(){ nextPattern(), nextNumber.value="" }, 1000);
    } else {
        if (tries >= 3 ) {
            hint.style.display = "block";
        }
        result.innerHTML = "Nope, try again"
    }
}

// Function to call the next pattern
function nextPattern() {
    result.innerHTML = "";
    hint.style.display = "none";
    document.getElementById("display-pattern").innerHTML = "";
    numbers = [];
    callRandomFunction();
    displayPattern();
}
