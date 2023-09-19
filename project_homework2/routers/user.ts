import express from 'express';
import { validateUser } from '../middleware/validation/user.js';
import { assignRoleToUser, getUserWithRolesPermission, insertRole, insertUser } from '../controllers/user.js';


const router = express.Router();

router.post('/', validateUser, (req, res) => {
    insertUser(req.body).then(() => {
        res.status(201).send()
    }).catch(err => {
        console.error(err);
        res.status(500).send('Something went wrong');
    });
});

router.post('/role', (req, res) => {
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

router.post('/permission', (req, res) => {
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


export default router;