import {Component, OnInit} from '@angular/core';
import {
  IonTab,
  IonTabButton,
  IonIcon,
  IonTabBar, IonTabs
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {calendarNumberOutline, personOutline, scaleOutline, walletOutline} from "ionicons/icons";
import {ProfilePage} from "../profile/profile.page";
import {AppointmentsPage} from "../appointments/appointments.page";
import {BodyMeasurementsPage} from "../body-measurements/body-measurements-page.component";
import {Client} from "../models/client";
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonTab, IonTabButton, IonIcon,
    IonTabBar, IonTabs, ProfilePage, AppointmentsPage, BodyMeasurementsPage],
})
export class HomePage implements OnInit {

  currentClient!: Client;

  constructor(private clientService: ClientService) {
    addIcons({calendarNumberOutline, scaleOutline, personOutline, walletOutline});
  }

  ngOnInit() {
    this.getCurrentClient();
  }

  private getCurrentClient(): void {
    this.clientService.getCurrentClient().subscribe({
      next: (data: Client) => {
        this.currentClient = Object.assign(new Client(), data);
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
