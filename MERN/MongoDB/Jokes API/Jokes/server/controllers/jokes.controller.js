const Joke = require('../models/jokes.model');
const Jokes = require('../models/jokes.model');

module.exports = {
    createNewJoke: (req, res) => {
        Jokes.create(req.body)
        .then(newlyCreatedJoke => res.json({joke: newlyCreatedJoke}))
        .catch(err => res.json({message: "Something went wrong", error: err}));
    },
    getAllJokes: (req, res) => {
        Jokes.find({})
        .then(allJokes => res.json({jokes: allJokes}))
        .catch(err => res.json({message: "Something went wrong", error: err}));
    },
    getOneJoke: (req, res) => {
        Jokes.findOne({_id: req.params._id})
        .then(oneJoke => res.json({joke: oneJoke}))
        .catch(err => res.json({message: "Something went wrong", error: err}));
    },
    getRandomJoke: (req, res) => {
        Jokes.aggregate([{$sample: {size: 1}}])
        .then(randomJoke => res.json({joke: randomJoke}))
        .catch(err => res.json({message: "Something went wrong", error: err}))
    },
    updateExistingJoke: (req, res) => {
        Jokes.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true})
        .then(updatedJoke => res.json({joke: updatedJoke}))
        .catch(err => res.json({message: "Something went wrong", error: err}));
    },
    deleteJoke: (req, res) => {
        Jokes.deleteOne({_id: req.params.id})
        .then(result => res.json({result: result}))
        .catch(err => res.json({message: "Something went wrong", error: err}));
    }
};