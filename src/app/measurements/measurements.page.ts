import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-body-measurements',
  templateUrl: './measurements.page.html',
  styleUrls: ['./measurements.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MeasurementsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
