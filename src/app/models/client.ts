import {User} from "./user";

export class Client {
  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  phone!: string;
  credits!: number;
  createdAt!: Date;
  updatedAt!: Date;
  user!: User;
  isDeleted!: boolean;
}
