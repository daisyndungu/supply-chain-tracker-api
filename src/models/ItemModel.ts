import { Document, Schema, model, Types } from 'mongoose';
// TODO add status eg Deleted, Active

// item status eg missing, not returned, returned, notes - damaged, INCustody

interface IItem extends Document {
    name: string;
    color: string;
    serialNumber: string;
    createdAt: Date,
    consumerId: Types.ObjectId;
    createdBy: Types.ObjectId;
    custodianId: Types.ObjectId,
    itemEvents: Types.ObjectId[]
}

const itemSchema: Schema = new Schema<IItem>({
    name: { type: String, required: true },
    color: String,
    serialNumber: { type: String, required: true, unique: true }, // TODO: Can be updated by ADMINs only
    createdAt: {type: Date, default: Date.now},
    consumerId: { type: Schema.Types.ObjectId }, // make this required field
    createdBy: { type: Schema.Types.ObjectId, required: true },
    custodianId: { type: Schema.Types.ObjectId, required: true },
    itemEvents: [{type: Schema.Types.ObjectId}]
});

const ItemModel = model<IItem>('Item', itemSchema);

export { IItem, ItemModel, itemSchema };
