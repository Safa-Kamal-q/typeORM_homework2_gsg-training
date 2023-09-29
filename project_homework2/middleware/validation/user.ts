import express, { NextFunction } from 'express'
import isEmail from 'validator/lib/isEmail.js'; //this is library 

const validateUser = (req: express.Request, res: express.Response, next: NextFunction) => {
    const errorList: String[] = [];
    const values = ['userName', 'password', 'email', 'type'];
    const user = req.body;

    values.forEach(key => {
        if (!user[key]) {
            errorList.push(`${key} is require`)
        }
    })

    if (!isEmail.default(user.email)) {
        errorList.push("The entered Email in not valid ")
    }

    if (user.password.length < 6) {
        errorList.push('The password length should at least be 6')
    }

    if (!['admin', 'user', 'editor'].includes(user.type)) {
        errorList.push('invalid type')
    }

    if (errorList.length > 0) {
        res.status(400).send(errorList)
    } else {
        next();
    }
}

export {
    validateUser
}