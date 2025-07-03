import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Appointment} from "../models/appointment";
import {environment} from "../../environments/environment";
import {ClientAppointments} from "../models/client-appointments";
import {DefaultPostRequest} from '../models/default-post-request';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) {
  }

  getAppointmentsByClient = () =>
    this.http.get<ClientAppointments>(environment.apiUrl + "/appointments/client");

  createAppointment = (request: DefaultPostRequest) =>
    this.http.post<Appointment>(environment.apiUrl + "/appointments/", request);
}
