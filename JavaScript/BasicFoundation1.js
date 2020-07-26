/* 
Basic Foundation I

Please work on the following challenges and upload your work in a single file. 
*/

// Get 1 to 255 - Write a function that returns an array with all the numbers from 1 to 255.
function get1To255() {
    arr = [];
    for (var i = 1; i <= 255; i++) {
        arr.push(i);
    }
    return arr;
}

// Get even 1000 - Write a function that would get the sum of all the even numbers from 1 to 1000.  You may use a modulus operator for this exercise.
function getEven1000() {
    sum = 0;
    for (var i = 1; i <= 1000; i++) {
        if (i % 2 === 0) {
            sum += i;
        }
    }
    return sum;
}

// Sum odd 5000 - Write a function that returns the sum of all the odd numbers from 1 to 5000. (e.g. 1+3+5+...+4997+4999).
function sumOdd5000() {
    sum = 0;
    for (var i = 1; i <= 5000; i++) {
        if (i % 2 !== 0) {
            sum += i;
        }
    }
    return sum;
}

// Iterate an array - Write a function that returns the sum of all the values within an array. (e.g. [1,2,5] returns 8. [-5,2,5,12] returns 14).
function iterateArray(arr) {
    sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    return sum;
}

// Find max - Given an array with multiple values, write a function that returns the maximum number in the array. (e.g. for [-3,3,5,7] max is 7)
function findMax(arr) {
    max = arr[0];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] >= max) {
            max = arr[i];
        }
    }
    return max;
}

// Find average - Given an array with multiple values, write a function that returns the average of the values in the array. (e.g. for [1,3,5,7,20] average is 7.2)
function findAvg(arr) {
    count = 0
    sum = 0;
    for (var i = 0; i < arr.length; i++) {
        count += 1;
        sum += arr[i];
    }
    avg = sum / count;
    return avg;
}

// Array odd - Write a function that would return an array of all the odd numbers between 1 to 50. (ex. [1,3,5, .... , 47,49]). Hint: Use 'push' method.
function arrayOdd() {
    arr = [];
    for (var i = 1; i <= 50; i++) {
        if (i % 2 === 1) {
            arr.push(i);
        }
    }
    return arr;
}

// Greater than Y - Given value of Y, write a function that takes an array and returns the number of values that are greater than Y. 
// For example if arr = [1, 3, 5, 7] and Y = 3, your function will return 2. (There are two values in the array greater than 3, which are 5, 7).
function greaterThanY(y, arr) {
    count = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > y) {
            count += 1;
        }
    }
    return count;
}

// Squares - Given an array with multiple values, write a function that replaces each value in the array with the value squared by itself. (e.g. [1,5,10,-2] will become [1,25,100,4])
function getSquares(arr) {
    newArr = [];
    for (var i = 0; i < arr.length; i++) {
        newArr.push(arr[i]**2);
    }
    return newArr;
}

// Negatives - Given an array with multiple values, write a function that replaces any negative numbers within the array with the value of 0. 
// When the program is done the array should contain no negative values. (e.g. [1,5,10,-2] will become [1,5,10,0])
function negatives(arr) {
    newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < 0) {
            newArr.push(0);
        }
        else {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

// Max/Min/Avg - Given an array with multiple values, write a function that returns a new array that only contains the maximum, minimum, and average values of the original array. (e.g. [1,5,10,-2] will return [10,-2,3.5])
function maxMinAvg(arr) {
    count = 0;
    sum = 0;
    max = arr[0];
    min = arr[0];
    for (var i = 0; i < arr.length; i++) {
        count += 1;
        sum += arr[i];
        if (arr[i] > max) {
            max = arr[i];
        }
        if (arr[i] < min) {
            min = arr[i];
        }
    }
    avg = sum / count; 
    newArr = [max, min, avg]
    return newArr
}

// Swap Values - Write a function that will swap the first and last values of any given array. The default minimum length of the array is 2. (e.g. [1,5,10,-2] will become [-2,5,10,1]).
function swapValues(arr) {
    newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (i == 0) {
            newArr.push(arr[arr.length - 1]);
        }
        else if (i == arr.length - 1) {
            newArr.push(arr[0])
        }
        else {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

// Number to String - Write a function that takes an array of numbers and replaces any negative values within the array with the string 'Dojo'. For example if array = [-1,-3,2], your function will return ['Dojo','Dojo',2].
function numToString(arr) {
    newArr = []
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] % 2 !== 0) {
            newArr.push("Dojo");
        }
        else {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}