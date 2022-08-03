import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HebrewDatePickerComponent } from './hebrew-date-picker.component';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { InjectionToken } from '@angular/core';

describe('HebrewDatePickerComponent', () => {
  let component: HebrewDatePickerComponent;
  let fixture: ComponentFixture<HebrewDatePickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HebrewDatePickerComponent],
      providers: [NgxIndexedDBService,
        {
          useValue: new InjectionToken<string>('NgxIndexedDBService'),
          provide: NgxIndexedDBService,
        }
      ],
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HebrewDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
