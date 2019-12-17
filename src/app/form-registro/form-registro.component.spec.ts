import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegistroComponent } from './form-registro.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';

describe('FormRegistroComponent', () => {
  let component: FormRegistroComponent;
  let fixture: ComponentFixture<FormRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        CookieService,
        MatSnackBar,
        Overlay
      ],
      declarations: [ FormRegistroComponent ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
