import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HebrewDatePickerRangeComponent } from './hebrew-date-picker-range.component';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { InjectionToken } from '@angular/core';

describe('HebrewDatePickerRangeComponent', () => {
  let component: HebrewDatePickerRangeComponent;
  let fixture: ComponentFixture<HebrewDatePickerRangeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HebrewDatePickerRangeComponent],
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
    fixture = TestBed.createComponent(HebrewDatePickerRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
