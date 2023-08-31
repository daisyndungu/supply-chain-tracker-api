import { Document, Schema, model, Types } from "mongoose";

enum Status {
    Dispatched = 'DISPATCHED',
    Pending = 'PENDING',
    Closed = 'CLOSED',
    InProgress = 'INPROGRESS',
    Cancelled = 'CANCELLED'
}

interface IItemEvent extends Document {
    itemId: Types.ObjectId,
    custodianId: Types.ObjectId,
    updatedBy: Types.ObjectId
    createdAt: Date,
    location: string,
    status: Status,
}

const ItemEventSchema = new Schema<IItemEvent>({
    itemId: { type: Schema.Types.ObjectId, ref: 'Item', required: true},
    custodianId: { type: Schema.Types.ObjectId, ref: 'User'}, // make required
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User'}, // make required
    createdAt: Date,
    location: String,
    status: {type: String, enum: Object.values(Status), default: Status.InProgress},
})

const ItemEventModel = model<IItemEvent>('ItemEvent', ItemEventSchema);

export { IItemEvent, ItemEventModel }