import {Appointment} from "./appointment";
import {CatalogData} from "./catalog-data";

export class AppointmentRequest {
  id!: string;
  comment!: string;
  type!: CatalogData;
  status!: CatalogData;
  appointment!: Appointment;
  createdAt!: Date;
  updatedAt!: Date;
}
