import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { SearchService } from '../shared/search.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { RegistroService } from '../shared/registro.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { MatSnackBar, MatSnackBarModule, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-search-api',
  templateUrl: './search-api.component.html',
  styleUrls: ['./search-api.component.scss']
})
export class SearchApiComponent implements OnInit, AfterViewInit {

  public displayedColumns: string[] = ['name', 'defaultBranch', 'git_url', 'language', 'description'];
  public arrayDataSource = new MatTableDataSource<datosTabla>([{name: 'UserName', defaultBranch: 'Default', git_url: 'Url', language: 'Lenguaje Info', description: 'N/A'}]);
  userSearch: string = '';
  
  // usuario para la busquedad
  gitUser = new FormControl();

  // suggestions
  options: User[] = [];
  
  filteredOptions: Observable<User[]>;


  @Input('updateCookies') set update (update) {
    // console.log('data from parent', update.github);
    // this.options['name'] = update.github;
    this.options.push({name: update.github});

    this.filteredOptions = this.gitUser.valueChanges
    .pipe(
      startWith<string | User>(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.options)
    );
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  

  constructor( private _serviceSearch: SearchService, private _serviceRegistro : RegistroService, private snackBar: MatSnackBar) { 
    // Fill array to suggestions
    this.options.unshift({name: JSON.parse(this._serviceRegistro.getCookie())[0].github});

    // Opcinoes para la sugerencia de usuarios
    // this.filteredOptions = this.gitUser.valueChanges
    // .pipe(
    //   startWith<string | User>(''),
    //   map(value => typeof value === 'string' ? value : value.name),
    //   map(name => name ? this._filter(name) : this.options)
    // ); 
  }



ngOnInit() { 
  
}

ngAfterViewInit(): void {
  this.arrayDataSource.sort = this.sort; 
  this.arrayDataSource.paginator = this.paginator;
}

search() {
  this.openSnackBar('Buscando informacion 🔍🌐', 15);
  // this.arrayDataSource = [{name: '', defaultBranch: '', git_url: '', language: '', description: ''}];
  const userSearch = this.gitUser.value.name !== undefined ? this.gitUser.value.name : this.gitUser.value;

  let arrayInfo : any = [];

  this._serviceSearch.getPublicRepositoriesByUser(userSearch).subscribe(
    (response: any) => {
        arrayInfo = response;
    },
    () => {
      // console.log('Error en la peticion');
      this.openSnackBar('Error del servidor, Intente nuevamente 🤦‍♂️☠', 10 );
    }
    ,
    () => {
      // console.log('rsponse info', arrayInfo);
      let arrayFilter = [];
      if (arrayInfo.length === 0){
        this.arrayDataSource.data = [{name: '', defaultBranch: '', git_url: '', language: '', description: ''}];
        this.openSnackBar('No hay informacion para su busquedad 😡!', 10);
      } else {
        arrayInfo.forEach( (element, index) => {
          let languages = null;            
              this._serviceSearch.getDataFromUrl(element.languages_url).subscribe(
                (data) => {
                  languages = JSON.stringify(Object.keys(data)).replace(/[`".<>\{\}\[\]\\\/]/gi, ' ');
                },
                null,
                () => {
                  arrayFilter.push({name: element.name, defaultBranch: element.default_branch, git_url: element.git_url, language: languages, description: element.description});
                  if (index === arrayInfo.length -1) {
                    this.arrayDataSource.data = arrayFilter as datosTabla[];
                    this.openSnackBar('Informacion Completa 🎉', 10);
                  }                
                }
              );
        });
      }

    }
  );

 
}

openSnackBar(message, durationSeconds = 5 ) {
  this.snackBar.open(message, 'Informacion', {duration: durationSeconds * 1000});
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

export interface datosTabla {
  name: string;
  defaultBranch: string;
  git_url: string;
  language: any;
  description: string;
}

export interface User {
  name: string;
}