const express =require('express');
const { route } = require('./auth');
const router =express.Router();


router.get('/',(req,res)=>{
res.status(201).json({
    profile: "profile created"
})
})

module.exports = router;