import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem, IonLabel,
  IonList,
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {createOutline, logOutOutline} from "ionicons/icons";
import {AuthenticationService} from "../services/authentication.service";
import {Client} from "../models/client";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonItem, IonList, IonButton, IonIcon, IonLabel]
})
export class ProfilePage {
  @Input() currentClient!: Client | null;

  constructor(private authenticationService: AuthenticationService) {
    addIcons({logOutOutline, createOutline})
  }

  logOut = () =>
    this.authenticationService.logOut("/login");

  requestPasswordChange = () =>
    this.authenticationService.requestPasswordChange("");
}
