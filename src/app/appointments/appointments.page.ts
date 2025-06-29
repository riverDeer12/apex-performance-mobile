import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonAvatar, IonButton,
  IonContent, IonFab, IonFabButton,
  IonIcon,
  IonItem, IonItemOption, IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList
} from '@ionic/angular/standalone';
import {AppointmentService} from "../services/appointment.service";
import {addIcons} from "ionicons";
import {add, closeOutline} from "ionicons/icons";
import {Appointment} from "../models/appointment";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonList, IonItem,
    IonLabel, IonIcon, IonItemSliding, IonAvatar, IonItemOptions, IonItemOption, IonButton, IonFab, IonFabButton]
})
export class AppointmentsPage implements OnInit {

  appointments!: Appointment[];

  constructor(private appointmentService: AppointmentService) {
    addIcons({add, closeOutline});
  }

  ngOnInit() {
    this.loadAppointments();
  }

  private loadAppointments(): void {
    this.appointmentService.getAppointmentsByClient().subscribe({
      next: (data: Appointment[]) => {
        this.appointments = data.map((x: Appointment) =>
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
