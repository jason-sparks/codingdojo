/* 
Basic Function I

Predict the output of the following code snippets.  Please do NOT run any of this code directly, but first predict the output using the T-diagram.  
If you're not used to using the T-diagram to run through the code yet, please get comfortable now.  This will help you down the line.  
Once you've predicted the output for all of the codes, then run the code one by one and compare the two.

Please turn in a text file that includes your prediction for each problem and the actual output. 
At the top of the file, indicate how many out of 15 you predicted correctly. 
*/

function a(){
    return 35;
}
console.log(a())

/* 
console 
--------
35
*/

function a(){
    return 4;
}
console.log(a()+a());

/* 
console 
--------
8
*/

 function a(b){
    return b;
}
console.log(a(2)+a(4));

/* 
console 
--------
6
*/

function a(b){
    console.log(b);
    return b*3;
}
console.log(a(3));

/* 
console 
--------
3
9
*/

function a(b){
   return b*4;
   console.log(b);
}
console.log(a(10));

/* 
console 
--------
40
*/

function a(b){
    if(b<10) {
        return 2;
    }
    else     {
        return 4;
    }
    console.log(b);
}
console.log(a(15));

/* 
console 
--------
4
*/

function a(b,c){
    return b*c;
}
console.log(10,3);
console.log( a(3,10) );

/* 
console 
--------
10 3
30
*/

function a(b){
    for(var i=0; i<10; i++){
        console.log(i);
    }
    return i;
}
console.log(3);
console.log(4);

/* 
console 
--------
3
4
*/

function a(){
    for(var i=0; i<10; i++){
        i = i +2;
        console.log(i);
    }
}
a();

/* 
  var |  value
------+---------
   i  |  0, 2, 3, 5, 6, 8, 9, 11

console 
--------
2 5 8 11
*/

function a(b,c){
    for(var i=b; i<c; i++) {
       console.log(i);
   }
   return b*c;
}
a(0,10);
console.log(a(0,10));

/* 
  var |  value
------+---------
   i  |  b 0 1 2 3 4 5 6 7 8 9 10
   b  |  0
   c  |  10

console 
--------
0 
1 
2 
3 
4 
5 
6 
7 
8 
9
0 
1 
2 
3 
4 
5 
6 
7 
8 
9
0
*/

function a(){
    for(var i=0; i<10; i++){
       for(var j=0; j<10; j++){
           console.log(j);
       }
       console.log(i);
    }
}

/* 
  var |  value
------+---------
   i  |   0 1 2 3 4 5 6 7 8 9 10
   j  |   0 1 2 3 4 5 6 7 8 9 10

console 
--------
No output
*/

function a(){
    for(var i=0; i<10; i++){
        for(var j=0; j<10; j++){
            console.log(i,j);
        }
        console.log(j,i);
    }
}

/* 
console 
--------
No output
*/

var z = 10;
function a(){
    var z = 15;
    console.log(z);
}
console.log(z);

/* 
console 
--------
10
*/

var z = 10;
function a(){
    var z = 15;
    console.log(z);
}
a();
console.log(z);

/* 
console 
--------
15
10
*/

var z = 10;
function a(){
    var z = 15;
    console.log(z);
    return z;
}
z = a();
console.log(z);

/* 
  var |  value
------+---------
   z  |  10 15

console 
--------
15 
15
*/