const { signup, login, updateUserProfile, getUserProfile, getUserWallet, updateUserWallet, SendMoney, getWeeklyTransactions } = require('../Controllers/AuthController');
const { signupValidation, loginValidation, protect } = require('../Middlewares/AuthValidation');

const router = require('express').Router();



router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.put('/updateProfile',protect,updateUserProfile)
router.get('/getProfile',protect,getUserProfile)
router.get('/getWallet',protect,getUserWallet) 
router.post('/updateWallet',protect,updateUserWallet)
router.post('/sendMoney',protect,SendMoney)
router.get('/getWeeklyTransactions', protect, getWeeklyTransactions);
module.exports = router;