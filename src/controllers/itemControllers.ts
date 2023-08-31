import { Request, Response } from 'express';

import { ItemModel } from '../models/ItemModel';

async function createItem(req: Request, res: Response){
    try{
        const newItem = await ItemModel.create(req.body);
        res.status(201).json({data: newItem});
    } catch(error) {
        res.status(500).json({error: `failed to create item. ${error}`});
    }
}

async function updateItem(req: Request, res: Response) {
    try{
        const { id } = req.params;
        const updatedItem = await ItemModel.findByIdAndUpdate(id, req.body, {returnDocument: 'after'})
        res.status(200).json({message: 'Item updated!', data: updatedItem})
    } catch(error){
        res.status(500).json({error: `failed to update item. ${error}`});
    }
}

export { createItem, updateItem };