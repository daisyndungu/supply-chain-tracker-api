import { Router } from 'express';
import { createItem, updateItem } from '../controllers/itemControllers'

const router = Router();

router.post('/items', createItem);
router.post('/items/:id/item', updateItem);

export default router;