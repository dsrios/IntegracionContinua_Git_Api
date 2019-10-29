import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { 

  }

  baseAPI = 'https://api.github.com';

  getPublicRepositoriesByUser( userName: string ) {
    // console.log('Info from pet', userName);
    

    // "https://api.github.com/users/{user}/repos{?type,page,per_page,sort}"
    // https://api.github.com/users/dsrios/repos?private=false
    const url = `${this.baseAPI}/users/${userName}/repos?private=false`

    return this.http.get(url);
  }

  getDataFromUrl(url: string) {
    return this.http.get(url);
  }
}

/*
lenguaje "languages_url": "https://api.github.com/repos/dsrios/bootcamp-angular2/languages"
branch por defecto "default_branch": "master"
url git "git_url": "git://github.com/dsrios/bootcamp-angular2.git",
nombre "name": "bootcamp-angular2",
descripción "description": "En este repositorio se subiran todos los proyectos realizados en durante las 32 horas de capacitación.",

*/