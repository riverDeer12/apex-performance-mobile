import {Appointment} from "./appointment";

export class ClientAppointments {
  approvedAppointments!: Appointment[];
  pendingAppointments!: Appointment[];
  inProgressAppointments!: Appointment[];
}
