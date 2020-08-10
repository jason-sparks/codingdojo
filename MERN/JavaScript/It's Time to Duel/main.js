class Card {
    constructor(name, cost) {
        this.name = name;
        this.cost = cost;
    }
}


class Unit extends Card {
    constructor(name, cost, power, res) {
        super(name, cost);
        this.power = power;
        this.res = res;
    }
    attack(target) {
        // Reduce target res by power
        if (target instanceof Unit) {
            target.res -= this.power;
        }
        else {
            throw new Error("Target must be a unit!");
        }
    }
}

class Effect extends Card {
    constructor(name, cost, text, stat, magnitude) {
        super(name, cost)
        this.text = text;
        this.stat = stat;   // power or res
        this.magnitude = magnitude; // i.e. 30, -15
        }
    play(target) {
        if (target instanceof Unit) {
            // implement card text here // Effects will require a "target" when they are played. They increase or decrease either the power or the resilience (stat) of the "Unit" that they target.
            if (this.stat == "res") {
                target.res += this.magnitude
            }
            else if (this.stat == "power") {
                target.power += this.magnitude
            }
        }
        else {
            throw new Error("Target must be a unit!");
        }
    }
}

// Instantiate Unit Cards 
// const RedBeltNinja = new Unit("Red Belt Ninja", 3, 3, 4)
// const BlackBeltNinja = new Unit("Black Belt Ninja", 4, 5, 4)

// Instantiate Effect Cards 
const HardAlgorithm = new Effect("Hard Algorithm", 2, "Increases target's resilience by 3", "res", 3);
const UnhandledPromiseRejection = new Effect("Unhandled Promise Rejection", 1, "reduce target's resilience by 2", "res", -2)
const PairProgramming = new Effect("Pair Programming", 3, "increase target's power by 2", "power", 2)


/*
Play out the following scenario
turn	action
*/

// 1	Player 1 summons "Red Belt Ninja"
const RedBeltNinja = new Unit("Red Belt Ninja", 3, 3, 4);
console.log(RedBeltNinja);

// 1	Player 1 plays "Hard Algorithm" on "Red Belt Ninja"
HardAlgorithm.play(RedBeltNinja);
console.log(RedBeltNinja);

// 2	Player 2 summons "Black Belt Ninja"
const BlackBeltNinja = new Unit("Black Belt Ninja", 4, 5, 4);
console.log(BlackBeltNinja);

// 2	Player 2 plays "Unhandled Promise Rejection" on "Red Belt Ninja"
UnhandledPromiseRejection.play(RedBeltNinja);
console.log(RedBeltNinja);

// 3	Player 1 plays "Pair Programming" on "Red Belt Ninja"
PairProgramming.play(RedBeltNinja);
console.log(RedBeltNinja);

// 3	Player 1 has "Red Belt Ninja" attack "Black Belt Ninja"
RedBeltNinja.attack(BlackBeltNinja);

console.log(BlackBeltNinja);