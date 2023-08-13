import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarAllocationListComponent } from '../solar-allocation-list/solar-allocation-list.component';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { DaysCountPipe } from '../days-count.pipe';
import { SolarAllocationListService } from '../solar-allocation-list/solar-allocation-list.service';
import { of, throwError } from '../../../node_modules/rxjs';

class SolarStub {
  getAllocations() {
    return of([]);
   };
  getSolarHeaterbyId(id) {
    return {};
  };
}

describe('SolarAllocationListComponent', () => {
  let component: SolarAllocationListComponent;
  let fixture: ComponentFixture<SolarAllocationListComponent>;
  let solarAllocationService: SolarAllocationListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolarAllocationListComponent, DaysCountPipe ],
      imports: [ FormsModule ],
      providers: [ {provide: SolarAllocationListService, useClass: SolarStub} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarAllocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    solarAllocationService = TestBed.get(SolarAllocationListService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke service and return IDs on invoking getAllocations function', () => {
    const spy = spyOn(solarAllocationService, 'getAllocations').and.returnValue(of([2000, 2001, 2002]));
    component.getAllId();
    expect(spy).toHaveBeenCalled();
    expect(component.solarHeaterIds).toEqual([2000, 2001, 2002]);
  });

  it('should display received error message on getAllId invocation', () => {
    spyOn(solarAllocationService, 'getAllocations').and.returnValue(throwError({error: {message: 'Invalid ID'}}));
    component.getAllId();
    expect(component.errorMessage).toEqual('Invalid ID');
  })

  it('should return details of ID selected by invoking getSolarHeaterbyId function', () => {//'Mon Jan 04 2020 11:30:54 GMT+0530 (India Standard Time)', installationDate:'Mon Jan 11 2020 11:30:54 GMT+0530 (India Standard Time)'
    spyOn(solarAllocationService, 'getSolarHeaterbyId').and.returnValue(of({ solarHeaterId : 2002, distributorName : 'A4solar', purchaseDate : new Date(2020, 1, 4, 11, 30, 54, 0) , installationDate : new Date(2020, 1, 11, 11, 30, 54, 0), customerId : 1001, message: '' }));
    solarAllocationService.getSolarHeaterbyId(2002)
    component.displaySelected();
    expect(solarAllocationService.getSolarHeaterbyId).toHaveBeenCalledWith(2002);
    expect(JSON.stringify(component.selectedSolar)).toBe(JSON.stringify({ solarHeaterId : 2002, distributorName : 'A4solar', purchaseDate : new Date(2020, 1, 4, 11, 30, 54, 0), installationDate : new Date(2020, 1, 11, 11, 30, 54, 0), customerId : 1001, message: '' }))
  })

  it('should display error message on getSolarHeaterbyId invocation', () => {
    spyOn(solarAllocationService, 'getSolarHeaterbyId').and.returnValue(throwError({error: {message: 'Invalid ID'}}));
    component.displaySelected();
    expect(component.errorMessage).toEqual('Invalid ID');
  })

});
