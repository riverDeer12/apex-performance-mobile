import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {addIcons} from "ionicons";
import {chevronBackOutline} from "ionicons/icons";

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss'],
})
export class ModalInfoComponent {

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
