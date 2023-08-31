import { Document, Schema, model, Types } from 'mongoose';
import { IItem, ItemModel } from './ItemModel';

interface IItemHistory extends Document {
    itemId: Types.ObjectId;
    createdAt: Date;
    whatChanged: IItem;
    changedBy: Types.ObjectId;
}

const ItemHistory = new Schema({
    itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
    createdAt: {type: Date, default: Date.now},
    whatChanged: ItemModel,
    changedBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

export const itemHistoryModel = model<IItemHistory>('ItemHistory', ItemHistory);