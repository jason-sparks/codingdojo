class BankAccount {
    constructor(balance = 0) {
        this.intRate = 0.01;
        this.balance = balance;
}
    deposit(amount) {
        this.balance += amount;
        return this;
    }
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
        }
        else {
            console.log("Insufficient funds: Charging a $5 fee");
            this.balance -= 5;
        }
        return this;
    }
    displayAccountInfo() {
        console.log(`Balance: $${this.balance}`)
        return this;
    }
    yieldInterest() {
        this.balance += this.balance * this.intRate;
        return this;
    }
}

// Create 2 accounts
const acct1001 = new BankAccount();
const acct1002 = new BankAccount(1000);


// To the first account, make 3 deposits and 1 withdrawal, then calculate interest and 
// display the account's info all in one line of code (i.e. chaining)
acct1001.deposit(1000).deposit(1025).deposit(1015).withdraw(500).yieldInterest().displayAccountInfo();


// To the second account, make 2 deposits and 4 withdrawals, then calculate interest and 
// display the account's info all in one line of code (i.e. chaining)
acct1002.deposit(2000).deposit(2500).withdraw(100).withdraw(200).withdraw(160).withdraw(260).yieldInterest().displayAccountInfo();
console.log(acct1002);