/*
Super Ninja
Sensei Class

Extend the Ninja class and create the Sensei class. A Sensei should have 200 Health, 10 speed, and 10 strength by default. 
In addition, a Sensei should have a new attribute called wisdom, and the default should be 10. 
Finally, add the speakWisdom() method. speakWisdom() should call the drinkSake() method from the Ninja class, before console.logging a wise message.

// example output
const superSensei = new Sensei("Master Splinter");
superSensei.speakWisdom();
// -> "What one programmer can do in one month, two programmers can do in two months."
superSensei.showStats();
// -> "Name: Master Splinter, Health: 210, Speed: 10, Strength: 10"
*/



class Ninja {
    constructor(name, health = 0, speed = 3, strength = 3) {
        this.name = name;
        this.health = health;
        this.speed = speed;
        this.strength = strength;
    }
    sayName() {
        console.log(this.name);
    }
    showStats() {
        console.log(this);
    }
    drinkSake() {
        this.health += 10;
    }
}


class Sensei extends Ninja  {
     constructor(name) {
        super(name, 200, 10, 10);
        this.wisdom = 10;
     }
     speakWisdom() {
         super.drinkSake();
         console.log("What one programmer can do in one month, two programmers can do in two months.");
     }
}

const superSensei = new Sensei("Master Splinter");
superSensei.speakWisdom();
superSensei.showStats();
