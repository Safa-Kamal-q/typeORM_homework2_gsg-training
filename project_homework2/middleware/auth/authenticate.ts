import express, { NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../../db/entities/User.js'

const authenticate = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const token = req.headers['authorization'] || '';
    let tokenIsValid
    try {
      tokenIsValid = jwt.verify(token, process.env.SECRET_KEY || '');
    } catch (error) {
        console.log(error)
    }
    if (tokenIsValid) {
      const decoded = jwt.decode(token, { json: true });
      const user = await User.findOneBy({ userName: decoded?.userName || '' })

      res.locals.user = user;
      next();
    } else {
      res.status(401).send("You are Unauthorized!");
    }
  }

export {
    authenticate
}