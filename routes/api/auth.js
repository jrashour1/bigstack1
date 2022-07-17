const express =require('express');
const router =express.Router();
const  bcrypt =require('bcryptjs');
const jsonwt =require('jsonwebtoken');
const passport =require('passport');
const key = require('../../setup/myurl').secret;
//import schema for person tto regiester
const Person = require('../../models/Person');


//@type     GET
//@route    /api/auth
//@des      just for testing 
//@access   PUBLIC
router.get('/', (req,res)=>{
    res.status(201).json({auth:'Auth being tested'});
    console.log("router log");
});
//@type     POST
//@route    /api/auth/register
//@des      route for registration of user
//@access   PUBLIC
router.post('/register',(req,res)=>{
    Person.findOne({email:req.body.email})
    .then((person)=>{
        if(person){
            return res.status(400).json({emailerror :'email is already regeistered'})
        }
        else{
            const newPerson = new Person({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            //encrypt password
            bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newPerson.password,salt,(err,hash)=>{
                    if(err) throw err;
                    newPerson.password = hash;
                    newPerson
                    .save()
                    .then((person)=>{res.json(person)})
                    .catch((err)=>{console.log(err);})
                })
            })
        }
    })
    .catch((err)=>{console.log(err);})
})


//@type     POST
//@route    /api/auth/login
//@des      route for login of user
//@access   PUBLIC

router.post('/login',(req,res)=>{
    const email= req.body.email;
    const password = req.body.password;
    
    

    Person.findOne({email})
    .then((person)=>{
        if(!person){
           return res.status(403).json({emailerror : "email not found "}) 
        }
        else{
           // Load hash from your password DB.
        bcrypt.compare(req.body.password, person.password).then((result) =>{
        if(result){
            res.json({success : "user is able to log in "})
            //use payload and creat token for user 
        }
});
        }
    })
    .catch((err)=>{console.log(err);})
})



module.exports=router;
