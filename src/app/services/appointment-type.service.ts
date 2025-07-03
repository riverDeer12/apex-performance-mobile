import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CatalogData} from "../models/catalog-data";

@Injectable({
  providedIn: 'root'
})
export class AppointmentTypeService {

  constructor(private http: HttpClient) {
  }

  getAppointmentTypes = () =>
    this.http.get<CatalogData[]>(environment.apiUrl + "/appointment-types");
}
