import express from 'express';
import { validateUser } from '../middleware/validation/user.js';
import {  assignRoleToUser, getUserWithRolesPermission, insertPermission, insertRole, insertUser, login } from '../controllers/user.js';
import { authenticate } from '../middleware/auth/authenticate.js';
import { authorize } from '../middleware/auth/authorize.js';


const router = express.Router();

router.post('/',validateUser, (req, res) => {
    insertUser(req.body).then(() => {
        res.status(201).send('user added successfully')
    }).catch(err => {
        console.error(err);
        res.status(500).send('Something went wrong');
    });
});

router.post('/role', authenticate,(req, res) => {
    const role = req.body
    if (!role.name) {
        res.status(400).send("The name of the role is require")
    }
    insertRole(role).then((data) => {
        res.status(201).send(data)
    }).catch(err => {
        console.log(err);
        res.status(500).send(err)
    })
})

router.post('/permission', authenticate,(req, res) => {
    const permission = req.body;
    if (!permission.name) {
        res.status(400).send("The name of the permission is require")
    }
    insertPermission(permission).then((data) => {
        res.status(201).send(data)
    }).catch(err => {
        console.log(err);
        res.status(500).send("Something went wrong")
    })
})

router.get('/:id',authenticate,authorize('GET_users/:id'), (req, res) => {
    const id = String(req.params.id);
    getUserWithRolesPermission(id).then((data) => {
        res.status(200).send(data)
    }).catch(err => {
        console.log(err);
        res.status(500).send('Something went wrong ')
    })
})

router.put("/assign_role",authenticate,authorize('PUT_users/assign_role'), (req, res, next) => {
    assignRoleToUser(req.body).then((data) => {
      res.status(201).send('Role added to user successfully')
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  });

router.post('/login', (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
  
    login(userName, password)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(401).send(err);
      })
  });

export default router;