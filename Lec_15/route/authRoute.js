const express = require('express');
const { signup, login } = require('../controllers/auth');

const router = express.Router();


router.get('/',(req,res)=>{
    res.sendFile('C:\\Users\\1234\\Desktop\\ADTU web 01july\\Lec_15\\html\\home.html')
})

router.get('/signup',(req,res)=>{
    res.sendFile('C:\\Users\\1234\\Desktop\\ADTU web 01july\\Lec_15\\html\\signup.html')
})

router.get('/login',(req,res)=>{
    res.sendFile('C:\\Users\\1234\\Desktop\\ADTU web 01july\\Lec_15\\html\\login.html')
})



router.post('/signup', signup)

router.post('/login', login)


module.exports = router;