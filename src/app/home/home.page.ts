import {Component} from '@angular/core';
import {
  IonTab,
  IonTabButton,
  IonIcon,
  IonTabBar, IonTabs
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {calendarNumberOutline, personOutline, scaleOutline, walletOutline} from "ionicons/icons";
import {ProfilePage} from "../profile/profile.page";
import {MeasurementsPage} from "../measurements/measurements.page";
import {AppointmentsPage} from "../appointments/appointments.page";
import {CreditsPage} from "../credits/credits.page";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonTab, IonTabButton, IonIcon,
    IonTabBar, IonTabs, ProfilePage, MeasurementsPage, AppointmentsPage, CreditsPage],
})
export class HomePage {
  constructor() {
    addIcons({calendarNumberOutline, scaleOutline, personOutline, walletOutline});
  }
}
