import { Request, Response } from 'express';

import { ItemModel } from '../models/ItemModel';

// TODO - validate requestbody fields are throw errors where necessary(get and patch ops)
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