import { TestBed } from '@angular/core/testing';

import { RegistroService } from './registro.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

describe('RegistroService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CookieService
    ],
    schemas: [
      NO_ERRORS_SCHEMA
    ]
  }));

  it('should be created', () => {
    const service: RegistroService = TestBed.get(RegistroService);
    expect(service).toBeTruthy();
  });
});
