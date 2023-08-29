import { ItemModel } from '../models/ItemModel';

async function createItem(req, res){
    try{
        const newItem = await ItemModel.create(req.body);
        res.status(201).json({success: `Item ${newItem.name} created successfully`})
    } catch(error) {
        res.status(500).json({error: `failed to create item. ${error}`})
    }
}

export { createItem };