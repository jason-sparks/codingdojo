const express = require("express");
const faker = require("faker");
const  app = express();


class User {
    constructor() {
        this._id = faker.random.uuid();
        this.firstName = faker.name.firstName();
        this.lastName = faker.name.lastName();
        this.phoneNumber = faker.phone.phoneNumber();
        this.email = faker.internet.email();
        this.password = faker.internet.password();
    }
}

class Company {
    constructor() {
        this._id = faker.random.uuid();
        this.name = faker.company.companyName();
        this.address = { 
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            zipCode: faker.address.zipCode(),
            country: faker.address.country(),
        }
    }
}

const server = app.listen(8000, () => {
    console.log(`Server is listening for connections on port ${server.address().port}`);
    console.log(`Locked and loaded`);
});

app.get("/api/users/new", (req, res) => {
    res.send(new User);
});

app.get("/api/companies/new", (req, res) => {
    res.send(new Company);
});

app.get("/api/user/company", (req, res) => {
    res.send({user: new User, company: new Company});
});