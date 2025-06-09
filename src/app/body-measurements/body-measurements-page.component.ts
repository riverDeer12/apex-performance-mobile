import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonAccordion,
  IonAccordionGroup,
  IonContent,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';
import {AuthenticationService} from "../services/authentication.service";
import {BodyMeasurementService} from "../services/body-measurement.service";
import {BodyMeasurementsByDay} from "../models/body-measurements-by-day";

@Component({
  selector: 'app-body-measurements',
  templateUrl: './body-measurements-page.component.html',
  styleUrls: ['./body-measurements-page.component.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonAccordionGroup, IonAccordion, IonLabel, IonItem]
})
export class BodyMeasurementsPage implements OnInit {

  bodyMeasurementsByDay!: BodyMeasurementsByDay[];

  isAdmin!: Promise<boolean>;

  constructor(private bodyMeasurementService: BodyMeasurementService,
              private authenticationService: AuthenticationService) {
  }

  async ngOnInit() {

    this.isAdmin = this.authenticationService.validateAdminUser();

    await this.isAdmin ?
      this.loadBodyMeasurements() : null;
  }

  private loadBodyMeasurements(): void {
    this.bodyMeasurementService.getAllBodyMeasurements().subscribe({
      next: (data: BodyMeasurementsByDay[]) => {
        this.bodyMeasurementsByDay = data.map((x: BodyMeasurementsByDay) =>
          Object.assign(new BodyMeasurementsByDay(), x),
        );
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
