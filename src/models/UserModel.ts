import * as validator from 'validator';
import { Document, Schema, model } from 'mongoose';

enum UserRole {
    SUPERUSER = 'SUPERUSER',
    ADMIN = 'ADMIN',
    CONSUMER = 'CONSUMER',
    USER = 'USER'
}

enum AccountStatus {
    ACTIVE = 'ACTIVE',
    DELETEd = 'DELETED',
    substring = 'SUSPENDED',
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
    userRole: UserRole,
    status: AccountStatus,
    createdAt: Date,
    password: string
}

export const UserSchema = new Schema<IUser>({
    username: {type: String, required: true},
    emailAddress: {type: String, required: true, unique: true, validate: {
        validator: (value: string) => {
          return validator.isEmail(value);
        },
        message: 'Invalid email address.',
      }},
    address: {type: String, required: true},
    title: String,
    companyName: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    userRole: {type: String, enum: Object.values(UserRole), required: true, default: UserRole.USER},
    status: {type: String, enum: Object.values(AccountStatus), default: AccountStatus.ACTIVE},
    createdAt: {type: Date, default: Date.now},
    password: { type: String, required: true }
});

const UserModel = model<IUser>('User', UserSchema)

export { IUser, UserModel, UserRole };
