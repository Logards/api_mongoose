const express = require('express');
const connectDB = require('./mongodb');
const routes = require('./api/profiles/routes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(routes);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
