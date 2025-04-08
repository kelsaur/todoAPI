const express = require('express'); //web server library
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');
const logger = require('./middleware/logger');

const app = express(); //my actual server
app.use(cors()); //>middleware<
app.use(express.json()); //tolkar allt i body som JSON - >middleware<
//säger till express: “If someone sends me JSON (like from Postman), parse it and put it in req.body.”
app.use(logger);

app.use('/api/todo', todoRoutes); //API routes
app.use('/api/user', userRoutes); //user routes

module.exports = app;
