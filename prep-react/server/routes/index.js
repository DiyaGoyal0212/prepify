const express = require('express')
const router = express.Router();

const userSignupController = require('../controllers/userSignup'); 
const userSignInController = require('../controllers/userSignin');
const userDetailsController =require('../controllers/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controllers/userLogout');
// const allUsers = require('../controller/allUsers')
// const updateUser = require("../controller/updateUser")

// app.use(express.json());

router.post("/signup", userSignupController);
router.post("/signin", userSignInController);
router.get("/user-details",authToken, userDetailsController);
router.get("/userLogout", userLogout)

//admin-panel
// router.get("/all-user",authToken, allUsers);
// router.post("/update-user",updateUser)

module.exports = router;