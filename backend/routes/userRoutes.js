import express from 'express'
import { login, signUp } from '../Controllers/usercontroller.js';
import authentication from '../Middlewares/authmiddleware.js';
import { createpost, getpost, editpost, deletepost, singlepost} from '../Controllers/postcontroller.js';

const router =express.Router();

router.post('/signup',signUp)
router.post('/login',login)
router.post('/createpost',authentication, createpost)
router.get('/getpost', getpost)
router.get('/getpost/:id', singlepost)
router.put('/editpost/:postId',authentication, editpost)
router.delete('/deletepost/:postId',authentication, deletepost)



export default router