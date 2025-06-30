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
import {AppointmentsPage} from "../appointments/appointments.page";
import {BodyMeasurementsPage} from "../body-measurements/body-measurements-page.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonTab, IonTabButton, IonIcon,
    IonTabBar, IonTabs, ProfilePage, AppointmentsPage, BodyMeasurementsPage],
})
export class HomePage {
  constructor() {
    addIcons({calendarNumberOutline, scaleOutline, personOutline, walletOutline});
  }
}
