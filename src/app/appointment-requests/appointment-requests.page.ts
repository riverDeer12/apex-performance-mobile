import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonContent, IonItem, IonItemSliding, IonLabel, IonList,
  IonRefresher, IonRefresherContent,
} from '@ionic/angular/standalone';
import {Client} from "../models/client";
import {AppointmentRequest} from '../models/appointment-request';
import {AppointmentRequestService} from '../services/appointment-request.service';

@Component({
  selector: 'app-appointment-requests',
  templateUrl: './appointment-requests.page.html',
  styleUrls: ['./appointment-requests.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonRefresher, IonRefresherContent, IonItem, IonItemSliding, IonLabel, IonList]
})
export class AppointmentRequestsPage implements OnInit {
  @Input() currentClient!: Client;

  appointmentRequests!: AppointmentRequest[];

  constructor(private appointmentRequestService: AppointmentRequestService) {
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
}
