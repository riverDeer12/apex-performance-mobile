import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonButton, IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {Appointment} from "../../models/appointment";
import {AppointmentService} from "../../services/appointment.service";

@Component({
  selector: 'app-client-appointments',
  templateUrl: './client-appointments.page.html',
  styleUrls: ['./client-appointments.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonButton]
})
export class ClientAppointmentsPage implements OnInit {

  appointments!: Appointment[];

  constructor(private appointmentService: AppointmentService) {
  }

  ngOnInit() {
    this.loadAppointmentsForClient();
  }

  private loadAppointmentsForClient(): void {
    this.appointmentService.getAppointmentsByClient().subscribe({
      next: (data: Appointment[]) => {
        this.appointments = data.map((x: Appointment) =>
          Object.assign(new Appointment(), x),
        );
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

}
