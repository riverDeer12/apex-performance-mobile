import {Component, OnInit} from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent} from '@ionic/angular/standalone';
import {AppointmentService} from "../services/appointment.service";
import {AppointmentsByDay} from "../models/appointments-by-day";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit {
  appointmentsByDay!: AppointmentsByDay[];

  constructor(private appointmentService: AppointmentService) {

  }

  ngOnInit() {
    this.loadAppointments();
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
