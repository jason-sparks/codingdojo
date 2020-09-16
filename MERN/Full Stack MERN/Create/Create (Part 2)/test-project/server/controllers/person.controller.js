const { Person } = require('../models/person.model');
module.exports.index = (request, response) => {
    Person.find({})
    .then(allPeople => response.json({person: allPeople}))
    .catch(err => res.json({message: "Something went wrong", error: err}));
}
    // The method below is new
module.exports.createPerson = (request, response) => {
    const { firstName, lastName } = request.body;
    Person.create({
        firstName,
        lastName
    })
        .then(person => response.json(person))
        .catch(err => response.json(err));
}
