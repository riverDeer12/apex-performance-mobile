import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonButton, IonContent, IonImg, IonInput} from '@ionic/angular/standalone';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {AuthResponse} from "../models/auth-response";
import {ToastController} from "@ionic/angular";
import {MessageService} from "../services/message.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonInput, IonButton, ReactiveFormsModule, IonImg]
})
export class LoginPage implements OnInit {

  form!: FormGroup;

  authResponse!: AuthResponse;

  loadingData = false;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService,
              private router: Router, private messageService: MessageService) {
  }

  ngOnInit(): void {
    if (this.authenticationService.isUserLogged()) {
      this.router.navigateByUrl("/home").then();
      return;
    } else {
      this.initForm();
    }
  }

  async submit() {
    this.loadingData = true;

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      await this.messageService
        .showWarningMessage('Incomplete or Incorrect data. Try again.');

      this.loadingData = false;

      return;
    }

    this.login();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false, [Validators.required]]
    })
  }

  private login() {
    this.authenticationService.login(this.form.value).subscribe((response: AuthResponse) => {
      this.authResponse = Object.assign(response as AuthResponse);

      localStorage.setItem('token', this.authResponse.token)

      this.messageService.showSuccessMessage('Login Is Successful.');

      this.router.navigateByUrl('/home').then();

      this.loadingData = false;
    }, error => {
      this.messageService.showErrorMessage('Login Error');
      this.loadingData = false;
    })
  }
}
