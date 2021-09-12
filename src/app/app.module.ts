import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { CalendarComponent } from './calendar';
import { LoginComponent } from './login';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HebrewDatePickerComponent } from './hebrew-date-picker/hebrew-date-picker.component';
import { HebrewDatePickerRangeComponent } from './hebrew-date-picker-range/hebrew-date-picker-range.component';
import { MachzorimRepository } from './_services/machzorim.repository';
import { DBConfig } from 'ngx-indexed-db';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import * as objectStores from './_helpers/objectStores';

export function migrationFactory() {
    return {
        2: (db: IDBDatabase, transaction: IDBTransaction) => {
            const store: IDBObjectStore = transaction.objectStore(objectStores.MACHZORIM);
            store.createIndex('hebStartDay', 'hebStartDay', { unique: false });
            store.createIndex('hebStartMonth', 'hebStartMonth', { unique: false });
            store.createIndex('hebStartYear', 'hebStartYear', { unique: false });
            store.createIndex('hebEndDay', 'hebEndDay', { unique: false });
            store.createIndex('hebEndMonth', 'hebEndMonth', { unique: false });
            store.createIndex('hebEndYear', 'hebEndYear', { unique: false });
        }
    }
}

// Database configuration
const dbConfig: DBConfig = {
    name: 'Calendar',
    version: 2,
    objectStoresMeta: [{
        store: 'machzorim',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
            { name: 'machzorStart', keypath: 'machzorStart', options: { unique: false } },
            { name: 'machzorEnd', keypath: 'machzorEnd', options: { unique: false } }
        ]
    }],
    migrationFactory
};
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule,
        FormsModule,
        NgxIndexedDBModule.forRoot(dbConfig)
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        CalendarComponent,
        LoginComponent,
        HebrewDatePickerComponent,
        HebrewDatePickerRangeComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider,

        MachzorimRepository
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
