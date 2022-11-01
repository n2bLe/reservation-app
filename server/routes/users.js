import express from 'express';
import {deleteUser, getUser, getUsers, updateUser } from '../controllers/User.js';
import { verifyUser, verifyAdmin, verifyToken } from '../utils/verify-token.js';


const router = express.Router();


//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser)

//GET ALL
router.get("/", verifyAdmin, getUsers);

export default router;