
export namespace NSUser {
  export enum Type {
    editor = 'editor',
    user = 'user',
    admin = 'admin'
  }

  export interface Item {
    id: string;
    userName: string;
    email: string;
    password: string;
    type: Type;
    createdAt: Date;
    firstName: string
    lastName: string
    dateOfBirth: string
    roles: Role[]
  }

  export interface Role {
    id: string;
    name: string;
    permissions: number[];
  }

  export interface Permission {
    id: number;
    name: string;
  }
}