import { DataSource } from "typeorm";
import { Profile } from "./entities/Profile.js";
import { User } from "./entities/User.js";
import Role from "./entities/Role.js";
import { Permission } from "./entities/Permission.js";


const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        Profile,
        User,
        Role,
        Permission
    ],
    // migrations: ['./**/migration/*.ts'],
    synchronize: true,
    logging: false
})

export const initDB = async () =>
  await dataSource.initialize().then(() => {
    console.log("Connected to DB!");
  }).catch(err => {
    console.error('Failed to connect to DB: ' + err);
  });

export default dataSource