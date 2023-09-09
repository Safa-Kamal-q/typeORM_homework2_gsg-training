import { In } from "typeorm";
import { NSUser } from "../@types/User.js";
import dataSource from "../db/dataSource.js";
import Role from "../db/entities/Role.js";
import { User } from "../db/entities/User.js";
import { Profile } from "../db/entities/Profile.js";
import { Permission } from "../db/entities/Permission.js";


const insertUser = async (payload: NSUser.Item) => {
    return dataSource.manager.transaction(async transaction => {
        const roles = await Role.find({ where: { name: payload.type } });

        const newUser = User.create({
            ...payload,
            roles: roles
        });

        await transaction.save(newUser);

        const profile = Profile.create({
            firstName: payload.firstName,
            lastName: payload.lastName,
            dateOfBirth: payload.dateOfBirth || ''
        })
        profile.user = newUser;
        await transaction.save(profile);
    });
}

const insertRole = async (payload: NSUser.Role) => {
    try {
        const role = new Role()
        role.name = payload.name;
        role.permissions = await Permission.findBy({
            id: In(payload.permissions)
        })
        await role.save()
        return role
    } catch (error) {
        console.log(error)
        throw ("Something went wrong")
    }
}

const insertPermission = async (payload: NSUser.Permission) => {
    try {
        const permission = new Permission();
        permission.name = payload.name

        await permission.save()
        return permission
    } catch (error) {
        console.log(error)
        throw ("Something went wrong")
    }
}

//router /:id and send the id for the function 
const getUserWithRolesPermission = async (id: string)=>{
    return await User.findOne({ where: { id }, relations: ['roles', 'roles.permissions'] });
}

export {
    insertPermission,
    insertRole,
    insertUser
}