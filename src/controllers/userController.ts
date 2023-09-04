import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken';

import { UserModel, IUser} from '../models/UserModel'

async function registerUser(req: Request, res: Response) {
    try{
        const newUser:IUser  = { ...req.body };
        const existingUser = await UserModel.findOne({emailAddress: newUser.emailAddress});
        if(!existingUser){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newUser.password, salt);
            newUser.password = hashedPassword;

            await UserModel.create(newUser);
            return res.status(201).json({message: 'New user Created'});
        }
        res.status(400).json({ error: 'User already exists'});

    } catch(error) {
        res.status(500).json({ error});
    }
}

async function login(req: Request, res: Response) {
    const { emailAddress, password } = req.body;

    try {
        const user = await UserModel.findOne({ emailAddress });
        if(!user) return res.status(404).json({ message: `User ${user} does not exist`});

        //check if passwords match
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            return res.status(401).json({ error: 'Invalid Credentials'})
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, role: user.userRole }, 'TODO - change secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch(error){
        res.status(500).json({error});
    }
}

export { registerUser, login }
