import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  ActionSheetController,
  IonButton,
  IonButtons,
  IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonModal, IonTitle, IonToolbar,
} from '@ionic/angular/standalone';
import {AppointmentService} from "../services/appointment.service";
import {Appointment} from "../models/appointment";
import {ClientAppointments} from '../models/client-appointments';
import {ClientAppointmentsPage} from "./client-appointments/client-appointments.page";
import {addIcons} from "ionicons";
import {add, closeOutline} from "ionicons/icons";
import {AppointmentFormPage} from "./appointment-form/appointment-form.page";
import {Client} from "../models/client";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonFab, IonFabButton, ClientAppointmentsPage,
    IonIcon, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, AppointmentFormPage]
})
export class AppointmentsPage implements OnInit {

  @Input() currentClient!: Client;

  approvedAppointments!: Appointment[];
  pendingAppointments!: Appointment[];
  inProgressAppointments!: Appointment[];

  constructor(private appointmentService: AppointmentService) {
    addIcons({add, closeOutline});
  }

  ngOnInit() {
    this.loadAppointments();
  }

  private loadAppointments(): void {
    this.appointmentService.getAppointmentsByClient().subscribe({
      next: (data: ClientAppointments) => {
        this.approvedAppointments = data.approvedAppointments.map((x: Appointment) =>
          Object.assign(new Appointment(), x),
        );
        this.pendingAppointments = data.pendingAppointments.map((x: Appointment) =>
          Object.assign(new Appointment(), x),
        );
        this.inProgressAppointments = data.inProgressAppointments.map((x: Appointment) =>
          Object.assign(new Appointment(), x),
        );
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  public sendAppointment(): void {

  }
}
