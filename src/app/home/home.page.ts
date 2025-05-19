import {Component, OnInit} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonTab,
  IonTabButton,
  IonIcon,
  IonTabBar, IonTabs, IonItem, IonList, IonLabel
} from '@ionic/angular/standalone';
import {AppointmentService} from "../services/appointment.service";
import {AppointmentsByDay} from "../models/appointments-by-day";
import {addIcons} from "ionicons";
import {calendarNumberOutline, personOutline, scaleOutline, walletOutline} from "ionicons/icons";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, IonTab, IonTabButton, IonIcon,
    IonTabBar, IonTabs, IonItem, IonList, IonLabel],
})
export class HomePage implements OnInit {
  appointmentsByDay!: AppointmentsByDay[];

  constructor(private appointmentService: AppointmentService) {
    addIcons({calendarNumberOutline, scaleOutline, personOutline, walletOutline});
  }

  ngOnInit() {
    // this.loadAppointments();
  }

  private loadAppointments(): void {
    this.appointmentService.getAppointmentsByClient().subscribe({
      next: (data: AppointmentsByDay[]) => {
        this.appointmentsByDay = data.map((x: AppointmentsByDay) =>
          Object.assign(new AppointmentsByDay(), x),
        );
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
