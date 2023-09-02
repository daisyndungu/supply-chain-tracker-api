import { Document, Schema, model, Types } from 'mongoose';
// import { } from './UserModel'
// TODO add status eg Deleted, Active

interface IItem extends Document {
    name: string;
    color: string;
    price: number;
    serialNumber: string;
    createdAt: Date,
    consumerId: Types.ObjectId;
    createdBy: Types.ObjectId;
}

const itemSchema: Schema = new Schema<IItem>({
    name: { type: String, required: true },
    color: String,
    price: Number,
    serialNumber: { type: String, required: true, unique: true }, // TODO: Can be updated by ADMINs only
    createdAt: {type: Date, default: Date.now},
    consumerId: { type: Schema.Types.ObjectId }, // make this required field
    createdBy: { type: Schema.Types.ObjectId, required: true }
});

const ItemModel = model<IItem>('Item', itemSchema);

export { IItem, ItemModel, itemSchema };