import { Router } from 'express';
import { createItem } from '../controllers/itemControllers'

const router = Router();

router.post('/items', createItem);

export default router;