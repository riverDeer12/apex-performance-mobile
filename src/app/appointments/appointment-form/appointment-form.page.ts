import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonDatetime,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';
import {CatalogData} from "../../models/catalog-data";
import {Coach} from 'src/app/models/coach';
import {AppointmentTypeService} from 'src/app/services/appointment-type.service';
import {CoachService} from 'src/app/services/coach.service';
import {AppointmentService} from 'src/app/services/appointment.service';
import {Appointment} from 'src/app/models/appointment';
import {MessageService} from 'src/app/services/message.service';
import {Client} from "../../models/client";
import {ClientService} from 'src/app/services/client.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.page.html',
  styleUrls: ['./appointment-form.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonList, IonItem,
    ReactiveFormsModule, IonSelect, IonSelectOption, IonDatetime, IonButton]
})
export class AppointmentFormPage implements OnInit {

  @Input() currentClient!: Client;

  form!: FormGroup;
  appointmentTypes!: CatalogData[];
  coaches!: Coach[];
  clients!: Client[];

  loadingData = false;

  constructor(private formBuilder: FormBuilder,
              private appointmentService: AppointmentService,
              private coachService: CoachService,
              private clientService: ClientService,
              private messageService: MessageService,
              private appointmentTypeService: AppointmentTypeService) {
  }

  ngOnInit() {
    this.initForm();
    this.getCoaches();
    this.getClients();
    this.getAppointmentTypes();
  }

  submit(): void {
    this.loadingData = true;

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      this.messageService.showWarningMessage('Check the entered data and try again.').then();

      this.loadingData = false;

      return;
    }

    this.createAppointment();
  }

  private createAppointment() {
    this.appointmentService.createAppointment(this.form.value).subscribe({
      next: (response: Appointment) => {
        this.messageService.showSuccessMessage('Appointment is created successfully.').then();
      },
      error: (error) => {
        this.messageService.showErrorMessage('An unexpected error occurred.').then();
      },
      complete: () => {
        this.loadingData = false;
      },
    });
  }

  private initForm() {
    this.form = this.formBuilder.group({
      startTime: ["", [Validators.required]],
      endTime: ["", [Validators.required]],
      type: ["", [Validators.required]],
      clients: [[this.currentClient.id], [Validators.required]],
      coaches: ["", [Validators.required]]
    });
  }

  private getCoaches() {
    this.coachService.getClientCoaches().subscribe((response: Coach[]) => {
      this.coaches = response.map((x: Coach) =>
        Object.assign(new Coach(), x),
      );
    });
  }

  private getClients() {
    this.clientService.getCoachRelatedClients().subscribe((response: Client[]) => {
      this.clients = response.map((x: Client) =>
        Object.assign(new Client(), x),
      );
    });
  }

  private getAppointmentTypes() {
    this.appointmentTypeService
      .getAppointmentTypes()
      .subscribe((response: CatalogData[]) => {
        this.appointmentTypes = response.map((x: CatalogData) =>
          Object.assign(new CatalogData(), x),
        );
      });
  }
}
