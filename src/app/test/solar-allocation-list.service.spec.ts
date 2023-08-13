import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { SolarAllocationListService } from '../solar-allocation-list/solar-allocation-list.service';
import { SolarHeater } from '../shared/SolarHeater';

describe('SolarAllocationListService with spies', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let solarAllocationService: SolarAllocationListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SolarAllocationListService]
    });
    solarAllocationService = TestBed.get(SolarAllocationListService);
  });
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    solarAllocationService = new SolarAllocationListService(<any> httpClientSpy);
  });

  it('should be created', inject([SolarAllocationListService], (service: SolarAllocationListService) => {
    expect(service).toBeTruthy();
  }));

  it('should return expected solar allocation IDs (HttpClient called once)', () => {
    const solarAllocationIDs: number[] = [2000, 2001, 2002];
    httpClientSpy.get.and.returnValue(of(solarAllocationIDs));

    solarAllocationService.getAllocations().subscribe(
      solarAllocation => expect(solarAllocation).toEqual(solarAllocationIDs, 'expected solar allocation list'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return expected solar allocation ID detail (HttpClient called once)', () => {
    const givenId: number = 2002;
    const allocationDetail: SolarHeater = {
      solarHeaterId : 2002,
      distributorName : 'A4solar',
      purchaseDate : new Date(2019, 11, 4, 20, 32, 30, 0),
      installationDate : new Date(2019, 11, 12, 20, 32, 30, 0),
      customerId : 1001,
      message: ''
    };
    httpClientSpy.get.and.returnValue(of(allocationDetail));

    solarAllocationService.getSolarHeaterbyId(givenId).subscribe(
      solarAllocation => {
        expect(JSON.stringify(solarAllocation)).toBe(JSON.stringify(allocationDetail), 'expected solar allocation list')
      },
      fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return an error when the server returns a 404 on collecting ID list', () => {
    const errorResponse = new HttpErrorResponse({
      error: {message: 'test 404 error'},
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(throwError(errorResponse));

    solarAllocationService.getAllocations().subscribe(
      allocationList => {
        fail('expected an error, not allocationList')
      },
      error  => {
        console.log('Error Object: ', error)
        expect(error).toEqual('test 404 error')
      }
    );
  });

  it('should return an error when the server returns a 404 on getting details based on ID', () => {
    const givenId: number = 2002;
    const errorResponse = new HttpErrorResponse({
      error: {message: 'test 404 error'},
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(throwError(errorResponse));

    solarAllocationService.getSolarHeaterbyId(givenId).subscribe(
      allocationList => fail('expected an error, not allocationList'),
      error  => {
        expect(error).toBe('test 404 error')
      }
    );
  });
});
