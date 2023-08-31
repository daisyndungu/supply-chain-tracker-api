import { Request, Response } from 'express';
import { Types } from 'mongoose';

import { ItemEventModel, IItemEvent } from '../models/ItemEventModel';

async function createItemEvent(req: Request, res: Response){
    try{
        const { id } = req.params;
        const itemEvent: IItemEvent = { ...req.body };
        itemEvent.itemId = new Types.ObjectId(id);
        const newItemEvent = await ItemEventModel.create(itemEvent);
        
        res.status(201).json({message: 'New Event created successfully', data: newItemEvent});
    } catch(error) {
        res.status(500).json({error: `failed to create item. ${error}`});
    }
}

export { createItemEvent }