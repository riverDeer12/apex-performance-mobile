import {Injectable} from '@angular/core';
import {Client} from "../models/client";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {

  }

  getCurrentClient = () =>
    this.http.get<Client>(environment.apiUrl + "/clients/current-client");
}
