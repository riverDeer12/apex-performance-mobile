import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonAvatar,
  IonContent, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList,
  IonRefresher, IonRefresherContent,
  ModalController,
} from '@ionic/angular/standalone';
import {Client} from "../models/client";
import {AppointmentRequest} from '../models/appointment-request';
import {AppointmentRequestService} from '../services/appointment-request.service';
import {BusinessStatuses} from "../constants/business-statuses";
import {addIcons} from "ionicons";
import {informationCircleOutline} from 'ionicons/icons';
import { ModalInfoComponent } from '../shared/modal-info/modal-info.component';

@Component({
  selector: 'app-appointment-requests',
  templateUrl: './appointment-requests.page.html',
  styleUrls: ['./appointment-requests.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonRefresher,
    IonRefresherContent, IonItem, IonItemSliding, IonLabel, IonList,
    IonAvatar, IonIcon, IonItemOption, IonItemOptions]
})
export class AppointmentRequestsPage implements OnInit {
  @Input() currentClient!: Client;

  appointmentRequests!: AppointmentRequest[];

  constructor(private appointmentRequestService: AppointmentRequestService,
              private modalController: ModalController,
              ) {
    addIcons({informationCircleOutline})
  }

  ngOnInit() {
    this.loadAppointmentRequests();
  }

  loadAppointmentRequests(event?: any): void {
    this.appointmentRequestService.getAppointmentRequestsByClient().subscribe({
      next: (data: AppointmentRequest[]) => {
        this.appointmentRequests = data.map((x: AppointmentRequest) =>
          Object.assign(new AppointmentRequest(), x),
        );
        event?.target.complete();
      },
      error: (err: any) => {
        console.error(err);
        event?.target.complete();
      },
    });
  }

  getTextColor(appointmentRequest: AppointmentRequest): string {
    switch (appointmentRequest.status.name) {
      case BusinessStatuses.Approved:
        return 'color: #4CAF50;'
      case BusinessStatuses.Declined:
        return 'color: #f44336;'
      default:
        return '';
    }
  }

  async openInfoModal(appointmentRequest: AppointmentRequest) {
    const modal = await this.modalController.create({
      component: ModalInfoComponent,
      componentProps: {
        title: "Appointment Request Information",
        data: appointmentRequest
      }
    });

    await modal.present();

    await modal.onWillDismiss();
  }
}
