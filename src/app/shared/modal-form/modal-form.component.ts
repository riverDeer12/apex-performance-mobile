import {Component, Input} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {EntityType} from 'src/app/constants/entity-type';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon, IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {AppointmentFormPage} from "../../appointments/appointment-form/appointment-form.page";
import {Client} from 'src/app/models/client';
import {
  AppointmentRequestCancelationFormPage
} from "../../appointments/appointment-request-cancelation-form/appointment-request-cancelation-form.page";
import { CommonModule } from '@angular/common';
import {addIcons} from "ionicons";
import { chevronBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
  imports: [
    CommonModule,
    IonContent,
    AppointmentFormPage,
    AppointmentRequestCancelationFormPage,
    IonButtons,
    IonToolbar,
    IonHeader,
    IonButton,
    IonIcon,
    IonTitle
  ],
  standalone: true,
  providers: [ModalController]
})
export class ModalFormComponent {
  @Input() type!: EntityType;
  @Input() title!: string;
  @Input() currentClient!: Client;
  @Input() appointmentId!: string;

  public get entityType(): typeof EntityType {
    return EntityType;
  }

  constructor(private modalController: ModalController) {
    addIcons({chevronBackOutline})
  }

  close() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalController.dismiss(null, 'confirm');
  }
}
