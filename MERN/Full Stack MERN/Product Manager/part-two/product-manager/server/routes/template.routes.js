const TemplateController = require('../controllers/template.controller');

module.exports = function(app){
    app.get('/api', TemplateController.index);
};
