import { TestBed, inject } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { AllocateServiceService } from '../allocate/allocate-service.service';
import { HttpErrorResponse } from '../../../node_modules/@angular/common/http';

describe('AllocateServiceService', () => {
  let httpMock: HttpTestingController;
  let allocationService: AllocateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AllocateServiceService]
    });
  });

  beforeEach(() => {
    httpMock = TestBed.get(HttpTestingController);
    allocationService = TestBed.get(AllocateServiceService);
  });

  it('should be created', inject([AllocateServiceService], (service: AllocateServiceService) => {
    expect(service).toBeTruthy();
  }));

  describe('should check the post call', () => {
    let result;
    let response: any;
    let request;

    beforeEach(() => {
      response = {message: 'Solar Heater 2006 successfully allocated to customer 1005'};
      allocationService.getData({
        distributorName : 'A4solar',
        purchaseDate : new Date(2019, 11, 4, 20, 32, 30, 0),
        installationDate : new Date(2019, 11, 12, 20, 32, 30, 0),
        customerId : 1001
      }).subscribe(res => {
        result = res.message;
      });
      request = httpMock.expectOne(allocationService.allocateUrl);
      request.flush(response);
      httpMock.verify();
    });

    it('should make request under POST method', () => {
      expect(request.request.method).toEqual('POST');
    });

    it('should return value from backend', () => {
      expect(result).toEqual('Solar Heater 2006 successfully allocated to customer 1005');
    });

    it('should return error message from backend', () => {
      const emsg = {message: 'The given Customer ID is not available'};

      allocationService.getData({
        distributorName : 'A4solar',
        purchaseDate : new Date(2019, 11, 4, 20, 32, 30, 0),
        installationDate : new Date(2019, 11, 12, 20, 32, 30, 0),
        customerId : 1001
      }).subscribe(
        data => fail('should have failed with the 404 error'),
        (error: HttpErrorResponse) => {
          const req = httpMock.expectOne(allocationService.allocateUrl);
          req.flush(emsg, { status: 404, statusText: 'Not Found' });
          expect(JSON.stringify(error.error)).toBe(JSON.stringify(emsg), 'message');
        }
      );
    });
  });
});
