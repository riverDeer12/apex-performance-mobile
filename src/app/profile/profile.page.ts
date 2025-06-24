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
import {logOutOutline} from "ionicons/icons";
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

  isAdmin!: Promise<boolean>;

  constructor(private authenticationService: AuthenticationService,
              private clientService: ClientService) {
    addIcons({logOutOutline})
  }

  async ngOnInit() {

    this.isAdmin = this.authenticationService.validateAdminUser();

    await this.isAdmin ? this.setAdminData() : this.getCurrentClient();
  }

  logOut = () =>
    this.authenticationService.logOut("/login");

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

  private setAdminData() {
    this.client = new Client();
    this.client.firstName = "Admin";
    this.client.lastName = "Admin";
  }
}
