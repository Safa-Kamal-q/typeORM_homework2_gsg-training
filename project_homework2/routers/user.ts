import express from 'express';
import { validateUser } from '../middleware/validation/user.js';
import { assignRoleToUser, getUserWithRolesPermission, insertRole, insertUser, login } from '../controllers/user.js';
import { authenticate } from '../middleware/auth/authenticate.js';
import { authorize } from '../middleware/auth/authorize.js';


const router = express.Router();

router.post('/', authorize('POST_users'),validateUser, (req, res) => {
    insertUser(req.body).then(() => {
        res.status(201).send()
    }).catch(err => {
        console.error(err);
        res.status(500).send('Something went wrong');
    });
});

router.post('/role',authorize('POST_users/role'),authenticate, (req, res) => {
    const role = req.body
    console.log(role.name) //this for test the value for role.name
    if (!role.name) {
        res.status(400).send("The name of the role is require")
    }
    insertRole(role).then((data) => {
        res.status(201).send(data)
    }).catch(err => {
        console.log(err);
        res.status(500).send("Something went wrong")
    })
})

router.post('/permission',authenticate, (req, res) => {
    const permission = req.body;
    if (!permission.name) {
        res.status(400).send("The name of the permission is require")
    }
    insertRole(permission).then((data) => {
        res.status(201).send(data)
    }).catch(err => {
        console.log(err);
        res.status(500).send("Something went wrong")
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.toString();
    getUserWithRolesPermission(id).then((data) => {
        res.status(200).send(data)
    }).catch(err => {
        console.log(err);
        res.status(500).send('Something went wrong ')
    })
})

router.put('/assign-role', (req, res) => {
    assignRoleToUser(req.body).then((data) => {
        res.send(200).send(data)
    }).catch(err => {
        console.log(err)
        res.status(404).send(err)
    })
})

router.post('/login', (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    login(userName, password).then(data => {
        res.send('data')
    }).catch(err => {
        console.log(err)
        res.send('Something went wrong ')
    })


})


export default router;