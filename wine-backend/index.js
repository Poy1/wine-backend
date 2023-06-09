const bodyParser = require('body-parser');
const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute"); 
const prodcategoryRouter = require("./routes/prodcategoryRoute");
const brandRouter = require("./routes/brandRoute"); 
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const morgan = require("morgan");
const cors = require("cors");


dbConnect();

app.use(morgan("dev"));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/api/user', authRouter);
app.use('/api/product', productRouter);
app.use('/api/category', prodcategoryRouter);
app.use('/api/brand', brandRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});