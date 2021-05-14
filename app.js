const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authenticate = require('./api/middleware/authenticate');


// console.log(authenticate);


const MONGODB_URI = 'mongodb://127.0.0.1/MyStore'

mongoose.connect(MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
    console.log('Mongoose is connected');
})

const adminRoutes = require('./api/routes/admins');
const categoryRoutes = require('./api/routes/categories');
const userRoutes = require('./api/routes/users');
const productRoutes = require('./api/routes/products');
const cartItemRoutes = require('./api/routes/cartItems');
const orderRoutes = require('./api/routes/orders');

app.use(express.json());



app.use('/admin', adminRoutes);
app.use('/category',categoryRoutes);
app.use('/user',userRoutes);
app.use('/products', productRoutes);
app.use('/cart', authenticate, cartItemRoutes);
app.use('/order', authenticate, orderRoutes);
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Not Found'
    })
})




module.exports = app;