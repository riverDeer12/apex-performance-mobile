import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonAvatar,
  IonContent,
  IonIcon,
  IonItem, IonItemOption, IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList
} from '@ionic/angular/standalone';
import {AppointmentsByDay} from "../models/appointments-by-day";
import {AppointmentService} from "../services/appointment.service";
import {ClientAppointmentsPage} from "./client-appointments/client-appointments.page";
import {AuthenticationService} from "../services/authentication.service";
import {addIcons} from "ionicons";
import {createOutline, trash} from "ionicons/icons";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, ClientAppointmentsPage, IonList, IonItem,
    IonLabel, IonIcon, IonItemSliding, IonAvatar, IonItemOptions, IonItemOption]
})
export class AppointmentsPage implements OnInit {

  appointmentsByDay!: AppointmentsByDay[];

  isAdmin!: Promise<boolean>;

  constructor(private appointmentService: AppointmentService,
              private authenticationService: AuthenticationService) {
    addIcons({createOutline, trash});
  }

  async ngOnInit() {

    this.isAdmin = this.authenticationService.validateAdminUser();

    await this.isAdmin ?
      this.loadAppointments() : null;
  }

  private loadAppointments(): void {
    this.appointmentService.getAllAppointments().subscribe({
      next: (data: AppointmentsByDay[]) => {
        this.appointmentsByDay = data.map((x: AppointmentsByDay) =>
          Object.assign(new AppointmentsByDay(), x),
        );
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
