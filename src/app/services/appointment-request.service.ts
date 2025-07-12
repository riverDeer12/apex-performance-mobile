import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Appointment} from "../models/appointment";
import {environment} from "../../environments/environment";
import {ClientAppointments} from "../models/client-appointments";
import {DefaultPostRequest} from '../models/default-post-request';
import {StatusResponse} from "../models/status-response";
import { AppointmentRequest } from '../models/appointment-request';

@Injectable({
  providedIn: 'root'
})
export class AppointmentRequestService {

  constructor(private http: HttpClient) {
  }

  getAppointmentRequestsByClient = () =>
    this.http.get<AppointmentRequest[]>(environment.apiUrl + "/appointment-requests/client");
}
