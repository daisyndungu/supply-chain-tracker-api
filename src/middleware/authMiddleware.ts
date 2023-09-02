import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import { UserRole } from '../models/UserModel';

// Middleware to authorize access based on user role(s)
export const authorize = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if the Authorization header starts with 'Bearer '
    const tokenPrefix = 'Bearer ';
    if (!authHeader.startsWith(tokenPrefix)) {
      return res.status(401).json({ error: 'Invalid token format' });
    }

    // Extract the token by removing the 'Bearer ' prefix
    const token = authHeader.substring(tokenPrefix.length);

    try {
      const decoded: any = jwt.verify(token, 'TODO - change secret');
      const userRole:UserRole  = decoded.role;

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ error: 'Access denied' });
      }

      req['userDetails'] = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
};
