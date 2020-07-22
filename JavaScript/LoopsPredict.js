// Predict the Output - Loops

// Practice using a T-diagram to go through the following code snippets and predict the output.  
// Once you're done run your code and see if your prediction was correct.  
// Create a .js file with the code snippets and your predicted output and upload it once you're done.


// Predict 1: 
                                                  //          var   |  value
 for(var num = 0; num < 15; num++){               //      ----------+----------
     console.log(num);                            //          num   |    0,1,2,3,4,5,6,7,8,9,10,11,12,13,14
}

                                                  //      console
                                                  //    -----------
                                                  //      0,1,2,3,4,5,6,7,8,9,10,11,12,13,14





// Predict 2:
                                                  //          var   |  value 
for(var i = 1; i < 10; i+=2){                     //      ----------+----------
     if(i % 3 == 0){                              //           i    |    1,3,5,7,9
         console.log(i);
     }
}

                                                  //      console
                                                  //    -----------
                                                  //      3,9



// Predict 3:
                                                  //          var   |  value
for(var j = 1; j <= 15; j++){                     //      ----------+----------
    if(j % 2 == 0){                               //           j    |    1,2,4,5,6,8,9,10,11,12,14,15,16
        j+=2;
    }
    else if(j % 3 == 0){
        j++;
    }
    console.log(j);
}

                                                  //      console
                                                  //    -----------
                                                  //      1,4,5,8,10,11,14,16