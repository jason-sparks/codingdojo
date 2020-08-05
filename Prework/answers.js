// Setting and Swapping
var myNumber = 42
var myName = "Jason"
myNumber = "Jason"
myName = 42

// Print -52 to 1066
for (var i = -52; i <= 1066; i++)
  {
    console.log(i)
  }
  
// Don’t Worry, Be Happy
function beCheerful()
{
  for (var i = 1; i <= 98; i++) {
    console.log("good morning!")
  }
}

// Multiples of Three – but Not All
for (var i = -300; i <= 0; i++) 
  {
    if (i == -3 || i == -6) {
   continue   
    } else {
      console.log(i)
    }
  }

// Printing Integers with While
var i = 2000
while (i <= 5280) {
  console.log(i)
  i++
}


// You Say It’s Your Birthday
function birthdayCheck(month, day) {
  if (month == 8 && day == 17){
    console.log("How did yuou know?")
  } else {
    console.log("Just another day")
  }
}


// Leap Year
function leapYear(year){
  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    return true
  } else {
    return false
  }
}


// The Final Countdown
function finalCountdown(mult, lowNum, highNum, skip)
{
  var i = lowNum
  while (i <= highNum) 
  {
    if (i % mult == 0 && i !== skip)
    {
      console.log(i)
    }
    i++  
  }
}

// Print and Count
var counter = 0
for (var i = 512; i <= 4096; i += 5) {
  console.log(i); counter += 1
}
console.log(counter) 

// Multiples of Six
while (i < 60000) {
  console.log(i) 
  i += 6;
}

// Counting, the Dojo Way
for (var i = 1; i <= 100; i++)
{
  if (i % 10 == 0)
  {
    console.log("Coding Dojo") 
  }
  else if (i % 5 == 0)
  {
    console.log("Coding") 
  }
  else
  {
    console.log(i) 
  }
}

// What Do You Know?
function printInput(input)
{
  console.log(input)
}

// Whoa, That Sucker’s Huge…
var sum = 0
for (var i = -300000; i <= 300000; i++)
{
  if (i % 2 == 1)
  {
    sum += i
  }
}
console.log(sum)

// Countdown by Fours
var i = 2016
while (i > 0) 
{
  console.log(i)
  i -= 4
}

// Flexible Countdown
function countdown(lowNum, highNum, mult)
{
  var i = highNum
  while (i >= lowNum) 
  {
    console.log(i)
    i -= mult
  }  
}












// Page 20 
// Countdown
function arrayCountdown(Number)
{
  var arr = []; 
  for (var i = Number; i >= 0; i--)
  {
    arr.push(i)
  }
  return arr
}

// 

// 

// 

// 

// 

