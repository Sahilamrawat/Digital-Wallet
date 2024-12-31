const { signup, login, updateUserProfile, getUserProfile } = require('../Controllers/AuthController');
const { signupValidation, loginValidation, protect } = require('../Middlewares/AuthValidation');

const router = require('express').Router();



router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.put('/updateProfile',protect,updateUserProfile)
router.get('/getProfile',protect,getUserProfile)

module.exports = router;