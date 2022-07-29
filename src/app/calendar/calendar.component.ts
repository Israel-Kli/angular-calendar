import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {User} from '@app/_models';
import {UserService} from '@app/_services';

@Component({
    templateUrl: 'calendar.component.html',
    styleUrls: ['calendar.component.css']
})
export class CalendarComponent implements OnInit {
    loading = false;
    users: User[];

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }
}
