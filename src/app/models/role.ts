import {User} from "./user";
import {Permission} from "./permission";

export class Role {
  id!: string;
  name!: string;
  description!: string;
  createdAt!: Date;
  updatedAt!: Date;
  isDeleted!: boolean;
  permissions!: Permission[];
  users!: User[];
}
