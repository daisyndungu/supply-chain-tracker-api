import { Request, Response } from 'express';
import { Types } from 'mongoose';
import * as url from 'url';

import { ItemEventModel, IItemEvent } from '../models/ItemEventModel';
import { IItem, ItemModel, Status } from '../models/ItemModel'

async function createItemEvent(req: Request, res: Response){
    try{
        const { id } = req.params;
        const item: IItem = await ItemModel.findById(id);
        if(item){
            const itemEvent: IItemEvent = { ...req.body };
            itemEvent.itemId = new Types.ObjectId(id);
            itemEvent.custodian = req["userDetails"].userId;
            
            let itemStatus: string = req.body['status'].toUpperCase();

            // Only Owner can update status to INCUSTODY
            if((itemStatus && itemStatus) == 'INCUSTODY' && (itemEvent.custodian != item.createdBy)){
                res.status(400).json({error: `Invalid Status update`});
            }
            
            // if not status given and not Owner, default status should be not returned 
            itemStatus = (!itemStatus && (itemEvent.custodian != item.createdBy)) ? Status.NOTRETURNED : item.status;

            const newItemEvent = await ItemEventModel.create(itemEvent);
            const itemEvents: Types.ObjectId[] = item.itemEvents;
            itemEvents.push(newItemEvent._id);

            // update item with status
            await ItemModel.findByIdAndUpdate(id, {custodian: req["userDetails"].userId, status: itemStatus, itemEvents });
            res.status(201).json({message: 'New Event created successfully', data: newItemEvent});
        } else {
            res.status(404).json({error: `Item with id ${id} not found`});
        }
    } catch(error) {
        res.status(500).json({error: `failed to create item. ${error}`});
    }
}

async function getAllEventsByItemId(req: Request, res: Response){
    try{
        const query = url.parse(req.url, true).query;
        const { id } = req.params;
        const custodianObjFields = ['username', 'emailAddress', 'phoneNumber', 'companyName'];
        
        // A shortcut to get the last item
        if(query['lastEvent']){
            const item = await ItemModel.findById(id);
            const lastEventId: Types.ObjectId = item.itemEvents[item.itemEvents.length -1];
            const lastEvent = await ItemEventModel.findById(lastEventId).populate('custodian', custodianObjFields);
            res.status(200).json({ data: lastEvent})
        } else {
            const allEvents = await ItemEventModel.find({ itemId: id }).populate('custodian', custodianObjFields);
            res.status(200).json({ data: allEvents});
        }
    } catch(error){
        res.status(500).json({ error })
    }
}

export { createItemEvent, getAllEventsByItemId }
