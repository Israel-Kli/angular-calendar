import { Component, OnInit } from '@angular/core';
import { Machzor } from '@app/_models';
import { MachzorimRepository } from '@app/_services/machzorim.repository';
import {
  NgbCalendar,
  NgbCalendarHebrew, NgbDate,
  NgbDatepickerI18n,
  NgbDatepickerI18nHebrew,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hebrew-date-picker',
  templateUrl: './hebrew-date-picker.component.html',
  styleUrls: ['./hebrew-date-picker.component.less'],
  providers: [
    {provide: NgbCalendar, useClass: NgbCalendarHebrew},
    {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nHebrew}
  ]
})
export class HebrewDatePickerComponent {

  model: NgbDateStruct;

  constructor(private calendar: NgbCalendar, 
              public i18n: NgbDatepickerI18n,
              private machzorim: MachzorimRepository) {
    this.dayTemplateData = this.dayTemplateData.bind(this);
  }

  dayTemplateData(date: NgbDate) {
    return {
      gregorian: (this.calendar as NgbCalendarHebrew).toGregorian(date)
    };
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  public addMachzor() {
    this.machzorim.addMachzor({ 
      hebStartDay: this.model.day,
      hebStartMonth: this.model.month,
      hebStartYear: this.model.year
    }).subscribe(result => console.log("Successfully added"));
  }
}
