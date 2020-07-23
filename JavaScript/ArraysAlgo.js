/* 
Algorithm Practice - Arrays

It's now time to practice writing your own algorithms using arrays!  
Create an algorithm for each of the challenges below. 
Make sure that you run your code to ensure your output is matching the provided expected output.  
One you are done, submit your .js file with the solution.
 */


// Using the given array:

var testArr = [6,3,5,1,2,4]


/* Print Values and Sum

   1. Print each array value and the sum so far
   2. The expected output will be: 

Num 6, Sum 6
Num 3, Sum 9
Num 5, Sum 14
Num 1, Sum 15
Num 2, Sum 17
Num 4, Sum 21 */

var sum = 0;
for (var i = 0; i < testArr.length; i++) {
    sum += testArr[i];
    console.log("Num " + testArr[i] + ", Sum " + sum);
}


/* Value * Position

   1. Multiply each value in the array by its array position
   2. The expected output will be:

[0,3,10,3,8,20]
 */

newArr = [];
for(var i = 0; i < testArr.length; i++) {
    newArr.push(testArr[i] * i);
}
console.log(newArr);
