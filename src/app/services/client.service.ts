import {Injectable} from '@angular/core';
import {Client} from "../models/client";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ClientCredits} from "../models/client-credits";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {

  }

  getCurrentClient = () =>
    this.http.get<Client>(environment.apiUrl + "/clients/current-client");

  getClientsCredits = () =>
    this.http.get<ClientCredits[]>(environment.apiUrl + "/clients/credits");

  getClients = () =>
    this.http.get<Client[]>(environment.apiUrl + "/clients");

  getCoachRelatedClients = () =>
    this.http.get<Client[]>(environment.apiUrl + "/clients/coach-related");
}
