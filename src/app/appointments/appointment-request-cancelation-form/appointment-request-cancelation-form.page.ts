import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonButton,
  IonContent, IonIcon,
  IonItem,
  IonList, IonSpinner, IonTextarea
} from '@ionic/angular/standalone';
import {Client} from "../../models/client";
import {AppointmentService} from "../../services/appointment.service";
import {MessageService} from "../../services/message.service";
import {StatusResponse} from "../../models/status-response";

@Component({
  selector: 'app-appointment-request-cancelation-form',
  templateUrl: './appointment-request-cancelation-form.page.html',
  styleUrls: ['./appointment-request-cancelation-form.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonButton, IonItem, IonList,
    ReactiveFormsModule, IonTextarea, IonIcon, IonSpinner]
})
export class AppointmentRequestCancelationFormPage implements OnInit {
  @Input() currentClient!: Client;
  @Input() appointmentId!: string;

  form!: FormGroup;

  loadingData = false;

  constructor(private formBuilder: FormBuilder,
              private appointmentService: AppointmentService,
              private messageService: MessageService,) {
  }

  ngOnInit() {
    this.initForm();
  }

  submit(): void {
    this.loadingData = true;

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      this.messageService.showWarningMessage('Check the entered data and try again.').then();

      this.loadingData = false;

      return;
    }

    this.createCancelationRequest();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      comment: ["", [Validators.required]]
    });
  }

  private createCancelationRequest() {
    this.appointmentService.createCancelationRequest(this.form.value, this.appointmentId).subscribe({
      next: (response: StatusResponse) => {
        this.messageService.showSuccessMessage('Cancelation Request is created successfully.').then();
      },
      error: (error) => {
        this.messageService.showErrorMessage('An unexpected error occurred.').then();
      },
      complete: () => {
        this.loadingData = false;
      },
    });
  }
}
