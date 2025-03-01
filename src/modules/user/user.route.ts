import express from 'express';
import { UserControllers } from './user.controller';


const router = express.Router();

router.get('/', UserControllers.getAllUsers);
router.get("/:email",UserControllers.getSingleUser )
router.delete("/:id",UserControllers.deleteUser)

export const UserRoutes = router;
