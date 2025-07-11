import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonAccordion, IonAccordionGroup,
  IonContent,
  IonItem,
  IonLabel, IonRefresher, IonRefresherContent
} from '@ionic/angular/standalone';
import {BodyMeasurementService} from "../services/body-measurement.service";
import {BodyMeasurement} from "../models/body-measurement";

@Component({
  selector: 'app-body-measurements',
  templateUrl: './body-measurements-page.component.html',
  styleUrls: ['./body-measurements-page.component.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonAccordion, IonLabel, IonItem, IonAccordionGroup,
    IonRefresher, IonRefresherContent]
})
export class BodyMeasurementsPage implements OnInit {

  bodyMeasurements!: BodyMeasurement[];

  constructor(private bodyMeasurementService: BodyMeasurementService) {
  }

  ngOnInit() {
    this.loadBodyMeasurements();
  }

  loadBodyMeasurements(): void {
    this.bodyMeasurementService.getClientBodyMeasurements().subscribe({
      next: (data: BodyMeasurement[]) => {
        this.bodyMeasurements = data.map((x: BodyMeasurement) =>
          Object.assign(new BodyMeasurement(), x),
        );
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
