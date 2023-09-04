import { Document, Schema, model, Types } from 'mongoose';

enum Status {
    MISSING='MISSING',
    NOTRETURNED='NOTRETURNED',
    DAMAGED='DAMAGED',
    INCUSTODY='INCUSTODY'
}

interface IItem extends Document {
    name: string;
    color: string;
    serialNumber: string;
    createdAt: Date,
    createdBy: Types.ObjectId;
    custodian: Types.ObjectId,
    itemEvents: Types.ObjectId[],
    status: Status,
}

const itemSchema: Schema = new Schema<IItem>({
    name: { type: String, required: true },
    color: String,
    serialNumber: { type: String, required: true, unique: true }, // TODO: Can be updated by ADMINs only
    createdAt: {type: Date, default: Date.now},
    createdBy: { type: Schema.Types.ObjectId, required: true },
    custodian: { type: Schema.Types.ObjectId, required: true },
    itemEvents: [{type: Schema.Types.ObjectId}],
    status: {type: String, enum: Object.values(Status), default: Status.INCUSTODY},
});

const ItemModel = model<IItem>('Item', itemSchema);

export { IItem, ItemModel, itemSchema, Status };
