import { Component, OnInit, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import { RegistroService } from '../shared/registro.service';
// import {MatSnackBar} from '@angular/material';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';


@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.scss']
})
export class FormRegistroComponent implements OnInit {

  // Variables para validaciones
  startDate = new Date(1990, 0, 1);
  email = new FormControl('', [Validators.required, Validators.email]);
  cedula = new FormControl('', [Validators.required]);
  gitUser = new FormControl('', [Validators.required]);
  durationSeconds = 5;

  // Variables para guardar la informacion del form
  nombres = '';
  apellidos = '';
  cc;
  fechaNacimiento = '';
  correo = '';
  github = '';
  arrayData = {};

  //Output para actualizar el contendor padre
  @Output() valueChange = new EventEmitter();

  constructor( private serviceRegistro : RegistroService, private snackBar: MatSnackBar ) { }

  ngOnInit() {
    
  }

   ErrorMessage( param ) {
  
    switch (param) {
      case 'email':
        return this.email.hasError('required') ? 'Ingresa un correo electronico' :
        this.email.hasError('email') ? 'Debe ingresar un correo valido' :
            '';        
        break;

      case 'cedula':
        return this.cedula.hasError('required') ? 'Ingresa un numero de cedula' : '';        
        break;
    
      case 'git':
        return this.gitUser.hasError('required') ? 'Debe ingresar un usuario' : '';
      break;

      default:
        return '';
        break; 
    }
    
  }

  save() {
    this.arrayData = { 'nombre': this.nombres, 'apellido': this.apellidos, 'cc': this.cc, 'fechaNacimiento': this.fechaNacimiento, 'correo': this.correo, 'github': this.github};
    const per = this.serviceRegistro.saveCookie(this.arrayData);
    
    // Clean values
    if (per) {
      this.nombres = '';
      this.apellidos = '';
      this.cc = null  ;
      this.fechaNacimiento = '';
      this.correo = '';
      this.github = '';

      this.valueChange.emit(per);
    }
    
    // open info modal
    this.openSnackBar();

    

  }

  openSnackBar() {
    this.snackBar.open('Informacion Guardada !!! 💾', 'Informacion', {duration: this.durationSeconds * 1000});
    
    // this.snackBar.openFromComponent(PizzaPartyComponent, {
    //   duration: this.durationSeconds * 1000,
    // });
  }



}
