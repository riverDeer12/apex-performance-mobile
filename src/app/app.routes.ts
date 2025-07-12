import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'appointments',
    loadComponent: () => import('./appointments/appointments.page').then(m => m.AppointmentsPage)
  },
  {
    path: 'credits',
    loadComponent: () => import('./credits/credits.page').then(m => m.CreditsPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.page').then(m => m.ProfilePage)
  },
  {
    path: 'body-measurements',
    loadComponent: () => import('./body-measurements/body-measurements-page.component').then(m => m.BodyMeasurementsPage)
  },
  {
    path: 'appointment-form',
    loadComponent: () => import('./appointments/appointment-form/appointment-form.page').then( m => m.AppointmentFormPage)
  },
  {
    path: 'appointment-request-cancelation-form',
    loadComponent: () => import('./appointments/appointment-request-cancelation-form/appointment-request-cancelation-form.page').then( m => m.AppointmentRequestCancelationFormPage)
  },
  {
    path: 'appointment-requests',
    loadComponent: () => import('./appointment-requests/appointment-requests.page').then( m => m.AppointmentRequestsPage)
  },
];
