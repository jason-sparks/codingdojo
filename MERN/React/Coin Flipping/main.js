function tossCoin() {
    return Math.random() > 0.5 ? "heads" : "tails";
}


/* function fiveHeadsSync() {
    let headsCount = 0;
    let attempts = 0;
    while(headsCount < 5) {
        attempts++;
        let result = tossCoin();
        console.log(`${result} was flipped`);
        if(result === "heads") {
            headsCount++;
        } else {
            headsCount = 0;
        }
    }
    return `It took ${attempts} tries to flip five "heads"`;
}
console.log( fiveHeadsSync() );
console.log( "This is run after the fiveHeadsSync function completes" );
 */


function fiveHeads() {
    return new Promise( (resolve, reject) => {
        // your code here!
        let headsCount = 0;
        let attempts = 0;

        while(headsCount < 5) {
            attempts++;
            let result = tossCoin();
            console.log(`${result} was flipped`);
            if(result === "heads") {
                headsCount++;
            } else {
                headsCount = 0;
            }
        }

        if (attempts <= 100) {
            resolve(`It took ${attempts} tries to flip five "heads"`);
        } else {
            reject("The coin has flipped more than 100 times and hasn't landed on heads five times in a row yet");
        }
    });
}

fiveHeads()
    .then( res => console.log(res) )
    .catch( err => console.log(err) );
console.log( "When does this run now?" );