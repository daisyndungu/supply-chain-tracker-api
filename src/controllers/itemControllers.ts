import { Request, Response } from 'express';

import { IItem, ItemModel } from '../models/ItemModel';

async function createItem(req: Request, res: Response){
    try{
        const newItem: IItem = { ...req.body };
        const item = await ItemModel.findOne({ serialNumber: newItem.serialNumber });
        
        if(item){
            return res.status(400).json({error: `Item with serialNumber ${item.serialNumber} already exists`})
        }

        const createdItem = await ItemModel.create(newItem);
        res.status(201).json({data: createdItem});
    } catch(error) {
        res.status(500).json({error: `failed to create item. ${error}`});
    }
}

async function updateItem(req: Request, res: Response) {
    try{
        const { id } = req.params;
        const incomingChanges: IItem = { ...req.body };
        const updatedItem = await ItemModel.findByIdAndUpdate(id, incomingChanges, {returnDocument: 'after'})
        res.status(200).json({message: 'Item updated!', data: updatedItem})
    } catch(error){
        res.status(500).json({error: `failed to update item. ${error}`});
    }
}

async function getOneItemById(req: Request, res: Response) {
    try{
        const { id } = req.params;
        const item = await ItemModel.findById(id);

        if(!item){
            res.status(404).json({error: `Item with id ${id} not found`});
        }

        res.status(200).json({data: item});
    } catch(error) {
        res.status(500).json({error});
    }
}

export { createItem, updateItem, getOneItemById };