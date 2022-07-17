//  npm packages
const express =require('express');
const mongoose =require('mongoose');
const bodyparser =require('body-parser');
const app = express();
const port = process.env.PORT || 5000
// data base url from myurl file 
const dbURL = require('./setup/myurl').mongoURL;


// imported routes
const question =require('./routes/api/question');
const profile = require('./routes/api/profile')
const auth  =require('./routes/api/auth');


//middleware for body parser
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//actual routes
app.use('/api/auth', auth); //badelo el url ely ana 3awz a7to fe postman we const el implmentation
app.use('/api/question', question);
app.use('/api/profile',profile);

// database connection 
mongoose
    .connect(dbURL)
    .then(()=>{console.log("db conccted sucssefuly");})
    .catch((err)=>{console.log(err);});
//port listener 
    app.listen(port, ()=>{
        console.log(`app runing on port ${port}`);
        console.log(`connecting to database ....`)
    });

