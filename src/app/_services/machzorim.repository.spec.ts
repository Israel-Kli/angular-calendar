import { InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MachzorimRepository } from './machzorim.repository';
import { NgxIndexedDBService } from 'ngx-indexed-db';

describe('PersistenceService', () => {
  let service: MachzorimRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxIndexedDBService,
        {
          useValue: new InjectionToken<string>('NgxIndexedDBService'),
          provide: NgxIndexedDBService,
        }
      ],
    });
    service = TestBed.inject(MachzorimRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
