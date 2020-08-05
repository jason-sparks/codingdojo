/* 
Assignment: JavaScript Hoisting
Objectives:
    1. Practice reading JavaScript the same way as the interpreter reads it.
Rewrite the code the way it would be seen by the interpreter and predict the output. 
An example is shown here:
// GIVEN
console.log(example);
var example = "I'm the example!";
AFTER HOISTING BY THE INTERPRETER
// var example;
// console.log(example); // logs undefined
// example = "I'm the example!";
After you've made your prediction, run the original code to find out if you were right! 
If your predictions were incorrect, look back at how the code is hoisted by the interpreter.
Note:
Run the same code as above with ES6 syntax and compare your results:
console.log(example);
let example = "I'm the example!";    
Even if let and const prevent a lot of the confusing behavior of JavaScript's hoisting, 
these are ES6 constructs and a huge amount of the world's live JavaScript code is still ES5. 
Understanding how ES5 hoists var and the rules of scoping are important for every JavaScript developer!
*/



// 1
console.log(hello);
var hello = 'world';
//
// AFTER HOISTING BY THE INTERPRETER
//
// var hello;
// console.log(hello); // logs undefined 
// hello = 'world';


// 2
var needle = 'haystack';
test();
function test(){
    var needle = 'magnet';
    console.log(needle);
}
//
// AFTER HOISTING BY THE INTERPRETER
//
// needle = 'haystack'; // logs undefined
// test();
// function test(){
//     needle = 'magnet';
//     var needle;
//     console.log(needle); // logs magnet
// }
// var needle;


// 3
var brendan = 'super cool';
function print(){
    brendan = 'only okay';
    console.log(brendan);
}
console.log(brendan);
//
// AFTER HOISTING BY THE INTERPRETER
//
// brendan = 'super cool';
// function print(){
//     brendan = 'only okay';
//     console.log(brendan);
// }
// console.log(brendan); // logs super cool


// 4
var food = 'chicken';
console.log(food);
eat();
function eat(){
    food = 'half-chicken';
    console.log(food);
    var food = 'gone';
}
//
// AFTER HOISTING BY THE INTERPRETER
//
// var food = 'chicken';
// console.log(food); // logs chicken

// function eat(){
//     food = 'half-chicken';
//     console.log(food); // logs half-chicken
//     var food = 'gone';
// }
// eat();


// 5
console.log(typeof mean);
mean();
console.log(food);
var mean = function() {
    food = "chicken";
    console.log(food);
    var food = "fish";
    console.log(food);
}
console.log(food);
//
// AFTER HOISTING BY THE INTERPRETER
//
// var mean;
// mean(); // logs mean is not a function
// console.log(food);
// var mean = function() {
//     food = "chicken";
//     console.log(food);
//     var food = "fish";
//     console.log(food);
// }
// console.log(food);


// 6
console.log(genre);
var genre = "disco";
rewind();
function rewind() {
    genre = "rock";
    console.log(genre);
    var genre = "r&b";
    console.log(genre);
}
console.log(genre);
//
// AFTER HOISTING BY THE INTERPRETER
//
// console.log(genre); // logs undefined 
// var genre = "disco";
// function rewind() {
//     genre = "rock";
//     console.log(genre); // logs rock
//     var genre = "r&b";
//     console.log(genre); // logs r&b
// }
// rewind();
// console.log(genre); // logs disco


// 7
dojo = "san jose";
console.log(dojo);
learn();
function learn() {
    dojo = "seattle";
    console.log(dojo);
    var dojo = "burbank";
    console.log(dojo);
}
console.log(dojo);
//
// AFTER HOISTING BY THE INTERPRETER
//
// dojo = "san jose";
// console.log(dojo); // logs san jose
//
// function learn() {
//         dojo = "seattle";
//         console.log(dojo); // logs seattle
//         var dojo = "burbank";
//         console.log(dojo); // logs burbank
//     }
// learn(); 
// 
// console.log(dojo); // logs san jose


// 8 - Bonus ES6: const
console.log(makeDojo("Chicago", 65));
console.log(makeDojo("Berkeley", 0));
function makeDojo(name, students){
    const dojo = {};
    dojo.name = name;
    dojo.students = students;
    if(dojo.students > 50){
        dojo.hiring = true;
    }
    else if(dojo.students <= 0){
        dojo = "closed for now";
    }
    return dojo;
}
//
// AFTER HOISTING BY THE INTERPRETER
//
// function makeDojo(name, students){
//     const dojo = {};
//     dojo.name = name;
//     dojo.students = students;
//     if(dojo.students > 50){
//         dojo.hiring = true;
//     }
//     else if(dojo.students <= 0){
//         dojo = "closed for now"; // error assignment to constant variable 
//     }
//     return dojo;
// }
//
// console.log(makeDojo("Chicago", 65)); 
// console.log(makeDojo("Berkeley", 0)); // error assignment to constant variable