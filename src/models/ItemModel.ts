import { Document, Schema, model, Types } from 'mongoose'

// TODO add status eg Deleted, Active

interface IItem extends Document {
    name: string;
    color: string;
    price: number;
    serialNumber: string;
    // events: Types.ObjectId[];
    // history: Types.ObjectId[];
}

const itemSchema: Schema = new Schema<IItem>({
    name: { type: String, required: true },
    color: String,
    price: Number,
    serialNumber: String,
    // events: [{ type: Schema.Types.ObjectId, ref: 'ItemEvent' }]
});

const ItemModel = model<IItem>('Item', itemSchema);

export { IItem, ItemModel };