import express from 'express';
import { createUser, loginUser, getUserById, updateUser, deleteUser } from '../controllers/userController'
deleteUser
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/create', createUser);
router.post('/login', loginUser);
router.get('/get/:id', auth, getUserById);
router.put('/update/:id', auth, updateUser);
router.delete('/delete/:id', auth, deleteUser);

export default router;