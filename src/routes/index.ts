import { Router } from 'express';

import { createItem, updateItem, getOneItemById, getAllItemsByUserId } from '../controllers/itemControllers';
import { createItemEvent, getAllEventsByItemId } from '../controllers/itemEventController';
import { registerUser, login } from '../controllers/userController'
import { addItemHistory, updateCustodian } from '../middleware/ItemMiddleware';
import { authorize } from '../middleware/authMiddleware'
import { UserRole } from '../models/UserModel'

const router = Router();

router.post('/register', registerUser);
router.post('/login', login);

router.post('/items', authorize([UserRole.ADMIN, UserRole.SUPERUSER]), createItem);
router.get('/items',authorize([UserRole.ADMIN, UserRole.SUPERUSER, UserRole.CONSUMER]), getAllItemsByUserId);
router.get('/items/:id',authorize([UserRole.ADMIN, UserRole.SUPERUSER, UserRole.CONSUMER]), getOneItemById);
router.patch('/items/:id', authorize([UserRole.ADMIN, UserRole.SUPERUSER]), addItemHistory, updateItem);
router.post('/items/:id/events', authorize([UserRole.ADMIN, UserRole.SUPERUSER, UserRole.CONSUMER]), updateCustodian, createItemEvent);
router.get('/items/:id/events', authorize([UserRole.ADMIN, UserRole.SUPERUSER]),getAllEventsByItemId);

export default router;
