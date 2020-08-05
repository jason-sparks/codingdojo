/* 
Predict the Output

Practice using a T-diagram to go through the following code snippets and predict the output.  
Once you're done run your code and see if your prediction was correct.  
Create a .js file with the code snippets and your predicted output and upload it once you're done.
 */


 // Predict 1:

function greeting(){
    return "Hello";
    console.log("World");
}
var word = greeting();
console.log(word);

/* 
   var   |  value
---------+----------
   word  |  "Hello"

 console
---------
 Hello
*/


// Predict 2: 

function add(num1, num2){
    console.log("Summing Numbers!");
    console.log("num1 is: " + num1);
    console.log("num2 is: " + num2);
    var sum = num1 + num2;
    return sum;
}
var result1 = add(3,5);
var result2 = add(4,7);
console.log(result1);
console.log(result2);

/* 
   var   |  value
---------+----------
 result1 |   8
 result2 |  11

 console
---------
Summing Numbers!
num1 is: 3
num2 is: 5
Summing Numbers!
num1 is: 4
num2 is: 7
8
11
*/


// Predict 3: 

function highFive(num){
    for(var i=0; i<num; i++){
        if(i == 5){
            console.log("High Five!");
        }
        else{
            console.log(i);
        }
    }
}

/* 
   var   |  value
---------+----------
    i    |   0
   num   |  undefined 

 console
---------

*/