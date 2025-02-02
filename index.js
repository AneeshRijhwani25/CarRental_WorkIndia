const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const db = require('./models');
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const carRoutes = require('./routes/car');
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const app = express();

app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api', userRoutes);
app.use('/api', carRoutes);
const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log("Welcome to Zoomcars");
    });
    
  });
