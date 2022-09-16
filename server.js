const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const transactionRoutes = require('./routes/revenue'); 

mongoose
    .connect(process.env.DB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    .then(() => console.log("DB Connection success"))
    .catch((error) => console.log("DB Connection error"))

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/revenue', transactionRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
