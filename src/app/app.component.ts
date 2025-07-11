import {Component, ViewChild} from '@angular/core';
import {IonApp, IonRouterOutlet, Platform} from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet]
})
export class AppComponent {

  @ViewChild(IonRouterOutlet, {static: true}) routerOutlet!: IonRouterOutlet;

  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      this.routerOutlet.swipeGesture = false;
    });
  }
}
