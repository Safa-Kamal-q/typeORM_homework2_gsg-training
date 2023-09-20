import express, { NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import {User} from '../../db/entities/User.js'

const authenticate = async(req: express.Request, res:express.Response, next:NextFunction)=>{

    const token= req.headers['authorization'] || '';

    let tokenIsValid= jwt.verify(token, process.env.SECRET_KEY || '')

    if(tokenIsValid){
        // JWT are decoded into JavaScript objects
        const decoded= jwt.decode(token, { json: true }
            //this option to make the decode return json type
            )
        const user= await User.findOneBy({email: decoded?.email || ''})
        res.locals.user= user 
        next()
    }else{
        res.status(401).send('You are unauthorized')
    }
}

export {
    authenticate
}