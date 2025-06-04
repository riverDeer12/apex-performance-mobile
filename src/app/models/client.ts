import {User} from "./user";

export class Client {
  id!: string;
  firstname!: string;
  lastname!: string;
  email!: string;
  phone!: string;
  credits!: number;
  createdAt!: Date;
  updatedAt!: Date;
  user!: User;
  isDeleted!: boolean;
}
