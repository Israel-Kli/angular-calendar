import {Component} from '@angular/core';
import { MachzorimRepository } from '@app/_services/machzorim.repository';
import {
    NgbCalendar,
    NgbCalendarHebrew,
    NgbDate,
    NgbDatepickerI18n,
    NgbDatepickerI18nHebrew,
    NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-hebrew-date-picker-range',
    templateUrl: './hebrew-date-picker-range.component.html',
    styleUrls: ['./hebrew-date-picker-range.component.less'],
    providers: [
        {provide: NgbCalendar, useClass: NgbCalendarHebrew},
        {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nHebrew}
    ]
})
export class HebrewDatePickerRangeComponent {

    hoveredDate: NgbDate | null = null;
    model: NgbDateStruct;

    fromDate: NgbDate;
    toDate: NgbDate | null = null;
    mikvahDay: NgbDate;
    vesetHachodeshDay: NgbDate;

    constructor(private calendar: NgbCalendar, 
                public i18n: NgbDatepickerI18n,
                private machzorim: MachzorimRepository) {
        this.dayTemplateData = this.dayTemplateData.bind(this);
        this.fromDate = calendar.getToday();
        this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    }

    dayTemplateData(date: NgbDate) {
        return {
            gregorian: (this.calendar as NgbCalendarHebrew).toGregorian(date)
        };
    }

    selectToday() {
        this.model = this.calendar.getToday();
    }

    getPrevMonth(){
        return this.calendar.getPrev(this.calendar.getToday(), 'm', 1);
    }

    onDateSelection(date: NgbDate) {
        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
        } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
            this.toDate = date;
            this.mikvahDay = this.calendar.getNext(this.toDate, 'd', 7);
            this.vesetHachodeshDay = this.calcVesetHachodeshDay(this.fromDate);
        } else {
            this.toDate = null;
            this.fromDate = date;
        }
    }

    isHovered(date: NgbDate) {
        return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
    }

    isInside(date: NgbDate) {
        return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
    }

    isRange(date: NgbDate) {
        return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
    }

    isMikvahDay(date: NgbDate) {
        return this.toDate && date.equals(this.mikvahDay);
    }

    private calcVesetHachodeshDay(fromDate: NgbDate) {
        const VesetHachodeshMonth = this.calendar.getNext(this.fromDate, 'm', 1);
        return new NgbDate(VesetHachodeshMonth.year, VesetHachodeshMonth.month, fromDate.day);
    }

    isVesetHachodeshDay(date: NgbDate) {
        return this.toDate && date.equals(this.vesetHachodeshDay);
    }

    addMachzor() {
        this.machzorim.addMachzor({ 
            hebStartDay: this.fromDate.day,
            hebStartMonth: this.fromDate.month,
            hebStartYear: this.fromDate.year,
            hebEndDay: this.toDate.day,
            hebEndMonth: this.toDate.month,
            hebEndYear: this.toDate.year
          }).subscribe(result => console.log("Successfully added"));      
    }
}
