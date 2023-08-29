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
    itemId: { type: Schema.Types.ObjectId, ref: 'Item'},
    custodianId: { type: Schema.Types.ObjectId, ref: 'User'},
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User'},
    createdAt: Date,
    location: String,
    status: {type: String, enum: Object.values(Status), default: Status.InProgress},
})

export const ItemTypeModel = model<IItemEvent>('ItemEvent', ItemEventSchema);