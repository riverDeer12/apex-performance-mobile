import { CatalogData } from "./catalog-data";
import {Client} from "./client";
import { Coach } from "./coach";

export class Appointment {
  id!: string;
  startTime!: Date;
  endTime!: Date;
  createdAt!: Date;
  updatedAt!: Date;
  type!: CatalogData;
  status!: CatalogData;
  clients!: Client[];
  coaches!: Coach[];
}
