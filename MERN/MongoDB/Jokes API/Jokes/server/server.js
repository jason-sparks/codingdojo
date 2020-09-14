const express = require('express');
const app = express();
const port = 8000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./config/mongoose.config');
require('./routes/jokes.routes')(app);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)    
});
