import {Injectable} from '@angular/core';
import {ToastController} from "@ionic/angular";
import {addIcons} from "ionicons";
import {closeCircleOutline, warning, checkmarkCircleOutline} from 'ionicons/icons';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toastController: ToastController) {
    addIcons({closeCircleOutline, warning, checkmarkCircleOutline});
  }

  showSuccessMessage = async (message: string) => {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      position: 'bottom',
      icon: checkmarkCircleOutline
    })

    await toast.present();
  }

  showWarningMessage = async (message: string) => {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      position: 'bottom',
      icon: warning
    })

    await toast.present();
  }

  showErrorMessage = async (message: string) => {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      position: 'bottom',
      icon: closeCircleOutline
    })

    await toast.present();
  }
}
