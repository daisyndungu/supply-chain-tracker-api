import { Document, Schema, model, Types } from "mongoose";

interface IItemEvent extends Document {
    itemId: Types.ObjectId,
    custodian: Types.ObjectId,
    updatedBy: Types.ObjectId
    createdAt: Date,
    location: string,
}

//event details-explanation

const ItemEventSchema = new Schema<IItemEvent>({
    itemId: { type: Schema.Types.ObjectId, ref: 'Item', required: true},
    custodian: { type: Schema.Types.ObjectId, ref: 'User'}, // make required
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User'}, // make required
    createdAt: {type: Date, default: Date.now},
    location: { type: String, required: true},
})

const ItemEventModel = model<IItemEvent>('ItemEvent', ItemEventSchema);

export { IItemEvent, ItemEventModel }
