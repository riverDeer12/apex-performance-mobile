import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonContent, IonItem, IonLabel, IonList} from '@ionic/angular/standalone';
import {AuthenticationService} from "../services/authentication.service";
import {ClientCredits} from "../models/client-credits";
import {ClientService} from "../services/client.service";

@Component({
  selector: 'app-credits',
  templateUrl: './credits.page.html',
  styleUrls: ['./credits.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonList, IonItem, IonLabel]
})
export class CreditsPage implements OnInit {

  clientCredits!: ClientCredits[];

  isAdmin!: Promise<boolean>;

  constructor(private clientService: ClientService,
              private authenticationService: AuthenticationService) {
  }

  async ngOnInit() {

    this.isAdmin = this.authenticationService.validateAdminUser();

    await this.isAdmin ?
      this.loadClientsCredits() : null;
  }

  private loadClientsCredits(): void {
    this.clientService.getClientsCredits().subscribe({
      next: (data: ClientCredits[]) => {
        this.clientCredits = data.map((x: ClientCredits) =>
          Object.assign(new ClientCredits(), x),
        );
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

}
