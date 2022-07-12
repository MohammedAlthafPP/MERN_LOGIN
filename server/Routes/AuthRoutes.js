
const { register,login,getAllUsers,getUser,deleteUser,updateUser,blockUser,unblockUser} = require("../Controllers/AuthControllers");

const router = require("express").Router();
//router.post("/",checkUser)
router.post('/register',register);
router.post('/login',login);
router.get('/users',getAllUsers);
router.get('/user/:id',getUser);
router.delete('/user/:id',deleteUser);
router.put('/user/:id',updateUser);
router.put('/block/:id',blockUser);
router.put('/unblock/:id',unblockUser);


module.exports =router;