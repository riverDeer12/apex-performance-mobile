import {AppointmentType} from "./appointment-type";
import {Client} from "./client";

export class Appointment {
  id!: string;
  startTime!: Date;
  endTime!: Date;
  createdAt!: Date;
  updatedAt!: Date;
  appointmentType!: AppointmentType;
  clients!: Client[];
}
