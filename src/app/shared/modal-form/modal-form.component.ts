import {Component, Input} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {EntityType} from 'src/app/constants/entity-type';
import {IonContent} from "@ionic/angular/standalone";
import {AppointmentFormPage} from "../../appointments/appointment-form/appointment-form.page";
import {Client} from 'src/app/models/client';
import {
  AppointmentRequestCancelationFormPage
} from "../../appointments/appointment-request-cancelation-form/appointment-request-cancelation-form.page";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
  imports: [
    CommonModule,
    IonContent,
    AppointmentFormPage,
    AppointmentRequestCancelationFormPage
  ],
  providers: [ModalController]
})
export class ModalFormComponent {
  @Input() type!: EntityType;
  @Input() currentClient!: Client;
  @Input() appointmentId!: string;

  public get entityType(): typeof EntityType {
    return EntityType;
  }

  constructor(private modalController: ModalController) {
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalController.dismiss(null, 'confirm');
  }
}
