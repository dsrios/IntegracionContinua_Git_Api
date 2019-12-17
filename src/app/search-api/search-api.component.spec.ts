import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchApiComponent } from './search-api.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SearchApiComponent', () => {
  let component: SearchApiComponent;
  let fixture: ComponentFixture<SearchApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchApiComponent ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
