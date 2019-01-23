var nextNumber = document.getElementById("next-number");
var display = document.getElementById("display-pattern");
var result = document.getElementById("result");

/** The hint value shows up after the user has tried a sequence more than 3 times, if the function assigns a value to it */
var hint = document.getElementById("hint");
var tries = 0;

/** The numbers array gets its values from whichever function is called */
var numbers = [];

/**  Array containing all random functions to be called. Function name must be included here */
var randomFunctions = [addSquares, twiceAdded,subtractCube,cubedAdd,fibonacci, exponential_one, exponential_two, exponential_three, exponential_four, log_e]];

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

function exponential_one() {
    var x = Math.floor(Math.random()*20)+1;
    let term = (n) => Math.pow((1 + (x/n)), n);
    for (let i=0; i <= 5; i++){
        num = toFixed(term(i), 2);        //using this to convert to 2 decimal places
        numbers.push(num);
    }
    hint.innerHTML = "what do you know about exponential series";
}

function exponential_two() {
    var n = Math.floor(Math.random()*5)+1;
    let term = (i) => Math.pow(-1, n) * Math.pow(i, n);
    for (let i=0; i < 5; i++) {
        numbers.push(term(i));
    }
    hint.innerHTML = "look again, think in powers"
}

function exponential_three() {
    let randomnum = Math.floor(Math.random() * 10) + 1;
    for (let i=0; i<5; i++){
        let power = i+1;
        let value = Math.pow(randomnum, power) / power;
        let rounded = toFixed(value, 2);
        numbers.push(rounded);
    }
    hint.innerHTML = "A number is raised to the index and divided by the index";
}

function exponential_four() {
    let randomnum = (Math.random() * 5) + 1;
    for (let i=0; i<5; i++){
        let value = Math.exp(-1/Math.pow(randomnum+i, 2));
        let rounded = toFixed(value, 2);
        numbers.push(rounded);
    }
    hint.innerHTML = "An exponential of a number";
}

function log_e() {
    let randomnum = (Math.random() * 10) + 1;
    for (let i=0; i<5; i++) {
        let value = Math.log(randomnum+i)    
        numbers.push(toFixed(value, 2));
    }
    hint.innerHTML = "Find out a random number added to index and Try some log on the it"
}
function toFixed( num, precision ) {        // This function helps to round up numbers. I didn't rely on Math.round because it doesn't round up number e.g math.round(6.345) = 6.34 instead of 6.35
    return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(precision);
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
            tries = 0
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
