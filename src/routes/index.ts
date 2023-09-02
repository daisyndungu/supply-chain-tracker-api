import { Router } from 'express';

import { createItem, updateItem, getOneItemById } from '../controllers/itemControllers';
import { createItemEvent, getAllEventsByItemId } from '../controllers/itemEventController';
import { registerUser, login } from '../controllers/userController'
import { addItemHistory } from '../middleware/ItemMiddleware';
import { authorize } from '../middleware/authMiddleware'
import { UserRole } from '../models/UserModel'

const router = Router();

router.post('/register', registerUser);
router.post('/login', login);
router.post('/items', authorize([UserRole.ADMIN, UserRole.CUSTODIAN, UserRole.SUPERUSER, UserRole.CONSUMER]), createItem);
router.get('/items/:id',authorize([UserRole.ADMIN, UserRole.CUSTODIAN, UserRole.SUPERUSER, UserRole.CONSUMER]), getOneItemById);
router.patch('/items/:id', authorize([UserRole.ADMIN, UserRole.CUSTODIAN, UserRole.SUPERUSER, UserRole.CONSUMER]), addItemHistory, updateItem);
router.post('/items/:id/events', authorize([UserRole.ADMIN, UserRole.CUSTODIAN, UserRole.SUPERUSER]),createItemEvent);
router.get('/items/:id/events', authorize([UserRole.ADMIN, UserRole.CUSTODIAN, UserRole.SUPERUSER, UserRole.CONSUMER]),getAllEventsByItemId);

export default router;