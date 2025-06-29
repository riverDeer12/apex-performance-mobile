import {HttpClient} from "@angular/common/http";
import {BodyMeasurement} from "../models/body-measurement";
import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {BodyMeasurementsByDay} from "../models/body-measurements-by-day";

@Injectable({
  providedIn: 'root'
})
export class BodyMeasurementService {

  constructor(private http: HttpClient) {
  }

  getAllBodyMeasurements = () =>
    this.http.get<BodyMeasurementsByDay[]>(environment.apiUrl + "/body-measurements");

  getClientBodyMeasurements = () =>
    this.http.get<BodyMeasurement[]>(environment.apiUrl + "/body-measurements/client");
}
