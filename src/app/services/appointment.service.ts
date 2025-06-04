import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Appointment} from "../models/appointment";
import {environment} from "../../environments/environment";
import {AppointmentsByDay} from "../models/appointments-by-day";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) {
  }

  getAppointmentsByClient = () =>
    this.http.get<Appointment[]>(environment.apiUrl + "/appointments/client");

  getAllAppointments = () =>
    this.http.get<AppointmentsByDay[]>(environment.apiUrl + "/appointments");
}
