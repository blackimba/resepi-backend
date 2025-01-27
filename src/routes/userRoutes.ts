import { Router } from "express";

import  { 
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    updateUser,
 } from "../controllers/userController";

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/create', createUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;