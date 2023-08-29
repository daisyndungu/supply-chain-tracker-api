import { Document, Schema, model, Types } from 'mongoose'

interface IItem extends Document {
    name: string;
    color: string;
    price: number;
    serialNumber: string;
    events: Types.ObjectId[];
    history: Types.ObjectId[];
    // referenceDataHistory: [ReferenceData], // auditing re
    // status: 
    // Postgres MVCC
    // Idempotency/Deduping
    // Use transactions to ensure pesistence
}

const itemSchema: Schema = new Schema<IItem>({
    name: { type: String, required: true },
    color: String,
    price: Number,
    serialNumber: String,
    events: [{ type: Schema.Types.ObjectId, ref: 'ItemEvent' }]
});

// monitoring metrics, sentrics, testing, api level, contollo, actuator equivalent.

const ItemModel = model<IItem>('Item', itemSchema);

export { IItem, ItemModel };