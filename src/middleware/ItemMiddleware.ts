import { Request, Response, NextFunction } from 'express';

import { IItem, ItemModel } from '../models/ItemModel'
import { itemHistoryModel } from '../models/ItemHistoryModel';

// A middleware to add Item History record before perfoming patch operation on an Item
const addItemHistory = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { id } = req.params;
        const item: IItem = await ItemModel.findById(id);
        if(item){
            // Check if the request contains changes different from the existing item
            const hasChanges = Object.keys(req.body).some(key => item[key] !== req.body[key]);

            if (!hasChanges) {
                return res.status(400).json({ error: 'No changes detected in the request' });
            }
            
            const newItemHistory = new itemHistoryModel({
                itemId: id,
                previousVersion: item,
                operation: 'UPDATE'
            })
            await itemHistoryModel.create(newItemHistory);
            next();
        }
    } catch(error){
        res.status(500).json({error: `An error occured during item update: ${error}`});
    }
}

const updateCustodian = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { id } = req.params;
        const item: IItem = await ItemModel.findById(id);
        if(item){
            await ItemModel.findByIdAndUpdate(id, {custodianId: req["userDetails"].userId });
            next();
        } else {
            return false
        }
    } catch(error){
        res.status(500).json({error: `An error occured during item update: ${error}`});
    }
}

export { addItemHistory, updateCustodian }
