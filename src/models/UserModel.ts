import { Document, Schema, model } from 'mongoose'

enum UserType {
    Admin = 'ADMIN',
    custodian = 'CUSTODIAN',
    Consumer = 'CONSUMER',
    User = 'USER'
}

enum AccountStatus {
    Active = 'ACTIVE',
    Deleted = 'DELETED',
    Suspended = 'SUSPENDED',
}

interface IUser extends Document {
    username: string,
    emailAddress: string,
    address: string,
    title: string,
    companyName: string,
    city: string,
    country: string,
    phoneNumber: string,
    userType: UserType,
    status: AccountStatus,
    createdAt: Date
}

export const UserSchema = new Schema<IUser>({
    username: {type: String, required: true},
    emailAddress: {type: String, required: true},
    address: {type: String, required: true},
    title: String,
    companyName: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    userType: {type: String, enum: Object.values(UserType), required: true, default: UserType.User},
    status: {type: String, enum: Object.values(AccountStatus), default: AccountStatus.Active},
    createdAt: {type: Date, default: Date.now},
});

const UserModel = model<IUser>('User', UserSchema)

export { IUser, UserModel };