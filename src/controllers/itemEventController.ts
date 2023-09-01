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

// TODO add a shortcut to get the last item
async function getAllEventsByItemId(req: Request, res: Response){
    try{
        const { id } = req.params;
        const allEvents = await ItemEventModel.find({ itemId: id });
        res.status(200).json({ data: allEvents})
    } catch(error){
        res.status(500).json({ error })
    }
}

export { createItemEvent, getAllEventsByItemId }