/*
Assignment: Users with Bank Accounts
Objectives:
    Practice writing classes with associations
 */


class User {
    constructor(username, emailAddress) {
        this.name = username;
        this.email = emailAddress;
        // this.account = new BankAccount(intRate=0.02, balance=0);
        this.account = [new BankAccount(200), new BankAccount(600)];
    }
    makeDeposit(amount, accountIndex) {
        this.account[accountIndex].balance += amount;
    }
    makeWithdrawal(amount, accountIndex) {
        this.account[accountIndex].balance >= amount ? this.accountBalance -= amount : console.log("Not enough funds available \n")
    }
    displayBalance() {
        console.log(`Hello ${this.name} your current balance is: $${this.account.balance} \n`);
    }
    transferMoney(otherUser, amount, fromAccountIndex, toAccountIndex) {
        if (this.account[fromAccountIndex].balance >= amount) {
            this.account[fromAccountIndex].balance -= amount;
            otherUser.account[toAccountIndex].balance += amount;
        }
        else console.log("Not enough funds available \n")
    }
}


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


// Create 3 instances of the User class
const guido = new User("Guido van Rossum", "guido@python.com");
const monty = new User("Monty Python", "monty@python.com");
const michael = new User("Michael Chang", "michael@codingdojo.com");


// Testing making a deposit with multiple accounts
console.log(guido);
guido.makeDeposit(200, 0);
console.log(guido);
