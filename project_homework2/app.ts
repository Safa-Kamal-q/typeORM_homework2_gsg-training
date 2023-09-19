import './config.js'
import express from 'express'
import "reflect-metadata"
import usersRouter from './routers/user.js'
import { initDB } from './db/dataSource.js';

const app = express();
const PORT = 5000;
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Server up')
})

app.use('/users', usersRouter);

app.use('/', (req, res) => {
    res.status(404).send("You requested something i don't have")
})

app.listen(PORT, () => {
    console.log(`App is listing on port ${PORT}`)
    initDB();
})