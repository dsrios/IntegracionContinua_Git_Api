import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('SearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[CookieService, HttpClient, HttpHandler],
    schemas: [
      NO_ERRORS_SCHEMA,
      CUSTOM_ELEMENTS_SCHEMA
    ]
  }));

  // it('should be created', () => {
  //   const service: SearchService = TestBed.get(SearchService);
  //   expect(service).toBeTruthy();
  // });
});
