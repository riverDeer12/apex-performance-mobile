import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonAvatar,
  IonContent,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions, IonItemSliding, IonLabel, IonList
} from '@ionic/angular/standalone';
import {Appointment} from "../../models/appointment";
import {addIcons} from "ionicons";
import {add, closeOutline} from "ionicons/icons";

@Component({
  selector: 'app-client-appointments',
  templateUrl: './client-appointments.page.html',
  styleUrls: ['./client-appointments.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonAvatar, IonIcon, IonItem,
    IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList]
})
export class ClientAppointmentsPage {

  @Input() appointments!: Appointment[];
  @Input() title!: string;
  @Input() type!: string;

  constructor() {
    addIcons({add, closeOutline});
  }
}
