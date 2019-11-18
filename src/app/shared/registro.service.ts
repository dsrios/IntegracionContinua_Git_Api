import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
  
@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private cookies: CookieService) { }

    saveCookie( data ) {
    const oldInfo = JSON.parse(this.getCookie());
    let info : any [] = oldInfo;
   
    if ( info.length >= 1) {
      info.unshift(data);
      this.cookies.set('datos', JSON.stringify(info)); 
    } {
      info = [data];
      this.cookies.set('datos', JSON.stringify(info)); 
    }
  
    return true;   
  }

  getCookie () {
    const data = { 'nombre': null, 'apellido': null, 'cc': null, 'fechaNacimiento': null, 'correo': null, 'github': null};
        
    if (this.cookies.get('datos') !== '') {
      return this.cookies.get('datos');
    } else {

      let info: any [];
      info = [data];
      return JSON.stringify(info);
    }
  }

  deleteCookies() {
    return this.cookies.deleteAll();    
  }
}
