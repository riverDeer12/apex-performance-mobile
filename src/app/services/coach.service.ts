import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Coach} from "../models/coach";

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  constructor(private http: HttpClient) {

  }

  getClientCoaches = () =>
    this.http.get<Coach[]>(environment.apiUrl + "/coaches/client");
}
