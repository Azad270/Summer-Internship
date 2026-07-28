const express = require('express');
const { getAllUsers, getUserbyId, createUser } = require('../controllers/userController');
const router =express.Router();



router.get('/' , getAllUsers);
router.get('/:id' , getUserbyId);

router.post('/', createUser);


module.exports = router;