require('dotenv').config()

const express = require ('express')
const app = express()
const usersController = require('./controllers/users_controller.js')
const mongoose = require ('mongoose')
const sessionsController = require('./controllers/sessions_controller.js');
const session = require('express-session');
const appController = require('./controllers/app_controller.js')
const methodOverride = require('method-override');
const PORT = process.env.PORT
const mongoURI = process.env.MONGODB_URI


app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use('/sessions', sessionsController);
app.use('/users',usersController)
app.use('/pghfree',appController)




app.get('/', (req, res)=>{
    res.render('index.ejs', {
        currentUser: req.session.currentUser
    });
});








//connections
mongoose.connect(mongoURI, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('connected to mongo')
})

app.listen(PORT,() => {
  console.log("listening");
})
