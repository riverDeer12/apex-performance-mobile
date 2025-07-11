import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonAvatar,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions, IonItemSliding, IonLabel, IonList,
  ModalController
} from '@ionic/angular/standalone';
import {Appointment} from "../../models/appointment";
import {addIcons} from "ionicons";
import {add, closeOutline} from "ionicons/icons";
import {ModalFormComponent} from "../../shared/modal-form/modal-form.component";
import { Client } from 'src/app/models/client';
import {EntityType} from "../../constants/entity-type";
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
  @Input() currentClient!: Client;
  @Input() title!: string;
  @Input() type!: string;

  constructor(private modalController: ModalController) {
    addIcons({add, closeOutline});
  }

  async openCancelationRequestModal(appointmentId: string): Promise<void> {
    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        title: "Cancelation Request",
        type: EntityType.AppointmentRequest,
        currentClient: this.currentClient,
        appointmentId: appointmentId
      }
    });
    await modal.present();

    const {data, role} = await modal.onWillDismiss();

    if (role === 'confirm') {
    }
  }
}
