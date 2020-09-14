const JokesController = require('../controllers/jokes.controller');

module.exports = (app) => {
    app.post("/api/jokes/", JokesController.createNewJoke);
    app.get("/api/jokes/search/", JokesController.getAllJokes);
    app.get("/api/jokes/search/:_id", JokesController.getOneJoke);
    app.get("/api/jokes/random/", JokesController.getRandomJoke);
    app.put("/api/jokes/update/:id", JokesController.updateExistingJoke);
    app.delete("/api/jokes/delete/:id", JokesController.deleteJoke);
};