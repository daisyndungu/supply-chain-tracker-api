import { Document, Schema, model, Types } from 'mongoose';
import { IItem, itemSchema } from './ItemModel';

enum Operations {
    DELETE = 'DELETE',
    UPDATE = 'UPDATE',
}

interface IItemHistory extends Document {
    itemId: Types.ObjectId;
    createdAt: Date;
    previousVersion: IItem;
    operation: Operations;
    changedBy: Types.ObjectId;
}

const ItemHistory = new Schema({
    itemId: { type: Schema.Types.ObjectId, ref: 'Item', require: true },
    createdAt: {type: Date, default: Date.now},
    previousVersion: { type: itemSchema, require: true},
    operation: { type: String, enum: Object.values(Operations), require:true },
    changedBy: { type: Schema.Types.ObjectId, ref: 'User' } // make required
});

export const itemHistoryModel = model<IItemHistory>('ItemHistory', ItemHistory);
