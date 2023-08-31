import { Router } from 'express';
import { createItem, updateItem, getOneItemById } from '../controllers/itemControllers'
import { createItemEvent, getAllEventsByItemId } from '../controllers/itemEventController'

const router = Router();

router.post('/items', createItem);
router.get('/items/:id', getOneItemById);
router.patch('/items/:id', updateItem);
router.post('/items/:id/events', createItemEvent);
router.get('/items/:id/events', getAllEventsByItemId);

export default router;