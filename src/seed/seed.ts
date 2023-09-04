import mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { UserModel } from '../models/UserModel'
import { ItemModel} from '../models/ItemModel';

import { connectToDatabase }  from '../helpers'

connectToDatabase();

const user1 = {
    "username": "janedoe",
    "emailAddress": "jane.doe@jdm.com",
    "address": "01000, off riverside",
    "title": "Administrator",
    "companyName": "JD Manufacturers",
    "city": "Nairobi",
    "country": "Kenya",
    "phoneNumber": "01744444130",
    "password": "password@999",
    "userRole": "ADMIN"
}

const user2 = {
    "username": "johndoe",
    "emailAddress": "john.doe@hd.com",
    "address": "01000",
    "title": "Administrator",
    "companyName": "Happy Distributors",
    "city": "Mombasa",
    "country": "Kenya",
    "phoneNumber": "017235689",
    "password": "password@12233",
    "userRole": "SUPERUSER"
}

const user3 = {
    "username": "kendiamani",
    "emailAddress": "kendiamani@tlc.com",
    "address": "01000, Kisumu",
    "title": "Administrator",
    "companyName": "Trusted Logistics Co",
    "city": "Mombasa",
    "country": "Kenya",
    "phoneNumber": "017235689",
    "password": "password@3331",
    "userRole": "SUPERUSER"
}

const user4 = {
    "username": "jabari",
    "emailAddress": "jabari@gmail.com",
    "address": "01000, Kisumu",
    "title": "",
    "companyName": "",
    "city": "Diani",
    "country": "Kenya",
    "phoneNumber": "017235689",
    "password": "password@6677",
    "userRole": "CONSUMER"
}

const item1 = {
    "name": "Container 1",
    "color": "black",
    "serialNumber": "c-199579-247"
}

const item2 = {
    "name": "Container 2",
    "color": "black",
    "serialNumber": "c-199579-157"
}

const item3 = {
    "name": "Pallet 1",
    "color": "black",
    "serialNumber": "c-199579-357"
}
async function seedData() {
    try {
      for (const newUser of [user1, user2, user3, user4]) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newUser.password, salt);
        newUser.password = hashedPassword;
        await UserModel.create(newUser);
      }
  
      const user = await UserModel.findOne({ username: user1.username });
  
      for (const item of [item1, item2, item3]) {
        const newItem = { ...item, createdBy: user._id, custodian: user._id };
        await ItemModel.create(newItem);
      }
      return { 'message': 'Data seeded successfully!!!'};
    } catch (error) {
      return {'error': `Error seeding data: ${error}`};
    }
}  

seedData().then(() => {
    mongoose.connection.close();
})
