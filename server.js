const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();


const transactionRoutes = require('./routes/register'); 
const pendapatanRoutes = require('./routes/pendapatan');

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
app.use(express.static('my-app/static'));


app.use('/api/register', transactionRoutes);
app.use('/api/pendapatan', pendapatanRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'my-app', 'src', 'app.html'));
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
