import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonContent, IonFab, IonFabButton, IonIcon, IonRefresher, IonRefresherContent,
  ModalController,
} from '@ionic/angular/standalone';
import {AppointmentService} from "../services/appointment.service";
import {Appointment} from "../models/appointment";
import {ClientAppointments} from '../models/client-appointments';
import {ClientAppointmentsPage} from "./client-appointments/client-appointments.page";
import {addIcons} from "ionicons";
import {add, closeOutline} from "ionicons/icons";
import {Client} from "../models/client";
import {ModalFormComponent} from "../shared/modal-form/modal-form.component";
import {EntityType} from "../constants/entity-type";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonFab, IonFabButton, ClientAppointmentsPage,
    IonIcon, IonRefresherContent, IonRefresher],
  providers: [ModalController]
})
export class AppointmentsPage implements OnInit {

  @Input() currentClient!: Client;

  approvedAppointments!: Appointment[];
  pendingAppointments!: Appointment[];
  inProgressAppointments!: Appointment[];

  constructor(private appointmentService: AppointmentService,
              private modalController: ModalController) {
    addIcons({add, closeOutline});
  }

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments(): void {
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

  async openNewAppointmentModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        title: "New Appointment",
        type: EntityType.Appointment,
        currentClient: this.currentClient
      }
    });
    await modal.present();

    const {data, role} = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.loadAppointments();
    }
  }
}
