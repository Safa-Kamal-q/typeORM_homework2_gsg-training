import { In } from "typeorm";
import { NSUser } from "../@types/User.js";
import dataSource from "../db/dataSource.js";
import Role from "../db/entities/Role.js";
import { User } from "../db/entities/User.js";
import { Profile } from "../db/entities/Profile.js";
import { Permission } from "../db/entities/Permission.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


const insertUser = async (payload: NSUser.Item) => {
    return dataSource.manager.transaction(async transaction => {
        //  const roles = await Role.find({ where: { name: payload.type } });
        const roles = await Role.findBy({
          id: In(payload.roles)
      })
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
const getUserWithRolesPermission = async (id: string) => {
    return await User.findOne({ where: { id }, relations: ['roles', 'roles.permissions'] });
}

const assignRoleToUser = async (payload: { roleId: string, userId: string }) => {
  const user = await User.findOne({ where: { id: payload.userId }, relations: ["roles"] });
  const role = await Role.findOne({ where: { id: payload.roleId } });

  if (user && role) {
    const existingRole = user.roles.includes(role)

    if (!existingRole) {
      user.roles.push(role);
      return user.save();
    } else {
      return "User already has this role.";
    }
  } else {
    if (!user) {
      return "User not found :(";
    } else {
      return "Role not found :(";
    }
  }
}

const login = async (userName: string, password: string) => {
    try {
      const user = await User.findOneBy({
        userName
      });
  
      const passwordMatching = await bcrypt.compare(password, user?.password || '');
  
      if (user && passwordMatching) {
        const token = jwt.sign(
          {
            email: user.email,
            userName: user.userName
          },
          process.env.SECRET_KEY || '',
          {
            expiresIn: "14d"
          }
        );
  
        return token;
      } else {
        throw ("Invalid Username or password!");
      }
    } catch (error) {
      throw ("Invalid Username or password!");
    }
  }

export {
    insertPermission,
    insertRole,
    insertUser,
    getUserWithRolesPermission,
    assignRoleToUser,
    login
}