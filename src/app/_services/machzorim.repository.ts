import { Injectable } from '@angular/core';
import * as objectStores from '@app/_helpers/objectStores';
import { Machzor } from '@app/_models/index';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MachzorimRepository {

  constructor(private db: NgxIndexedDBService) { }
  
  public addMachzor(machzor: Machzor): Observable<number> {
    return this.db.add(objectStores.MACHZORIM, {
      hebStartDay: machzor.hebStartDay,
      hebStartMonth: machzor.hebStartMonth,
      hebStartYear: machzor.hebStartYear,
      hebEndDay: machzor.hebEndDay,
      hebEndMonth: machzor.hebEndMonth,
      hebEndYear: machzor.hebEndYear,
    });
  }
}
