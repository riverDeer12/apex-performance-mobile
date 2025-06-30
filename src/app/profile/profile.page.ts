import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem, IonLabel,
  IonList,
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {createOutline, logOutOutline} from "ionicons/icons";
import {AuthenticationService} from "../services/authentication.service";
import {Client} from "../models/client";
import {ClientService} from "../services/client.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonItem, IonList, IonButton, IonIcon, IonLabel]
})
export class ProfilePage implements OnInit {

  client!: Client | null;

  constructor(private authenticationService: AuthenticationService,
              private clientService: ClientService) {
    addIcons({logOutOutline, createOutline})
  }

  ngOnInit() {
    this.getCurrentClient();
  }

  logOut = () =>
    this.authenticationService.logOut("/login");

  requestPasswordChange = () =>
    this.authenticationService.requestPasswordChange("");

  private getCurrentClient(): void {
    this.clientService.getCurrentClient().subscribe({
      next: (data: Client) => {
        this.client = Object.assign(new Client(), data);
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
