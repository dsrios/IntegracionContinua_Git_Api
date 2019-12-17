import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { RegistroService } from '../shared/registro.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  arrayData = {};
 

  public displayedColumns: string[] = ['nombre', 'apellido', 'cc', 'fechaNacimiento', 'correo', 'github'];
  public arrayDataSource = new MatTableDataSource<datosTabla>();

  userSearch: string = '';
  
  // usuario para la busquedad
  user = new FormControl();

  // suggestions
  options: User[] = [];
  
  filteredOptions: Observable<User[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  
  constructor(private serviceRegistro: RegistroService, private snackBar: MatSnackBar) {
    // console.log(JSON.parse(this.serviceRegistro.getCookie()));
    // this.arrayData = JSON.parse(this.serviceRegistro.getCookie())[0];
    // console.log('registrado ', JSON.parse(this.serviceRegistro.getCookie())[0]);
    
    this.arrayDataSource.data = JSON.parse(this.serviceRegistro.getCookie());
  }

ngOnInit() {

}

// To be complete
search() {
  // console.log('search ', this.serviceRegistro.getCookie());
  this.arrayDataSource.data = JSON.parse(this.serviceRegistro.getCookie());
}

ngAfterViewInit(): void {
  this.arrayDataSource.sort = this.sort;
  this.arrayDataSource.paginator = this.paginator;
}


openSnackBar(message, durationSeconds = 5 ) {
  this.snackBar.open(message, 'Información', {duration: durationSeconds * 1000});
}


// Funciones para la sugerencia de usuarios
displayFn(user?: User): string | undefined {
  return user ? user.name : undefined;
}

private _filter(name: string): User[] {
  const filterValue = name.toLowerCase();
  return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
}

public doFilter = (value: string) => {
  value.length >= 3 
                  ? this.arrayDataSource.filter = value.trim().toLocaleLowerCase() 
                  : this.arrayDataSource.filter = ''.trim().toLocaleLowerCase();
}

}

// tslint:disable-next-line:class-name
export interface datosTabla {
  nombre: string;
  apellido: string;
  cc: any;
  fechaNacimiento: string;
  correo: string;
  github: string;
}

export interface User {
  name: string;
  apellidos: string;
  email: string;
  git_user: string;

}
