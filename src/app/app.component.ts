import { Component, OnDestroy } from '@angular/core';
import { RegistroService } from './shared/registro.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ic-gestor-de-candidatos';
  arrayData = {};

  constructor(private serviceRegistro : RegistroService) {
    // console.log(JSON.parse(this.serviceRegistro.getCookie()));
    this.arrayData = JSON.parse(this.serviceRegistro.getCookie())[0];
  }

  updateHeader( event: Event ) {
    // console.log('Event from child', event);
    if(event) {
      this.arrayData = JSON.parse(this.serviceRegistro.getCookie())[0];
    }
  }  
}
