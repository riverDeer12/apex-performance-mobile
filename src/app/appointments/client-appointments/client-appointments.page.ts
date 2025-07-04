import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonAvatar,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions, IonItemSliding, IonLabel, IonList
} from '@ionic/angular/standalone';
import {Appointment} from "../../models/appointment";
import {addIcons} from "ionicons";
import {add, closeOutline} from "ionicons/icons";
import { AppointmentService } from 'src/app/services/appointment.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-client-appointments',
  templateUrl: './client-appointments.page.html',
  styleUrls: ['./client-appointments.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonAvatar, IonIcon, IonItem,
    IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList]
})
export class ClientAppointmentsPage {

  @Input() appointments!: Appointment[];
  @Input() title!: string;
  @Input() type!: string;

  constructor(private appointmentService: AppointmentService,
              private messageService: MessageService) {
    addIcons({add, closeOutline});
  }

  confirmCancelation(appointmentId: string): void {
    this.appointmentService.sendCancelationRequest(appointmentId).subscribe((response) => {
      this.messageService.showSuccessMessage('Cancelation request has been sent.').then();
    })
  }
}
