import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateComponent } from '../allocate/allocate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllocateServiceService } from '../allocate/allocate-service.service';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';
import { of, throwError } from 'rxjs';

class AllocateStub {
  allocateUrl;
  getData(data) {
    return {};
  };
}

describe('AllocateComponent', () => {
  let component: AllocateComponent;
  let fixture: ComponentFixture<AllocateComponent>;
  let allocateService: AllocateServiceService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocateComponent ],
      imports: [ FormsModule, ReactiveFormsModule, HttpClientModule ],
      providers: [ {provide: AllocateServiceService, useClass: AllocateStub} ]
      // providers: [AllocateServiceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // component.ngOnInit();
    allocateService = TestBed.get(AllocateServiceService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.allocateForm.valid).toBeFalsy();
  });

  it('distributor name field validity', () => {
    let errors = {};
    let distributorName = component.allocateForm.controls['distributorName'];
    expect(distributorName.valid).toBeFalsy();

    // Distributor Name field is required
    errors = distributorName.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('purchase date field validity', () => {
    let errors = {};
    let purchaseDate = component.allocateForm.controls['purchaseDate'];
    expect(purchaseDate.valid).toBeFalsy();

    // Distributor Name field is required
    errors = purchaseDate.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('installation date field validity', () => {
    let errors = {};
    let installationDate = component.allocateForm.controls['installationDate'];
    expect(installationDate.valid).toBeFalsy();

    // Distributor Name field is required
    errors = installationDate.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('customer Id field validity', () => {
    let errors = {};
    let customerId = component.allocateForm.controls['customerId'];
    expect(customerId.valid).toBeFalsy();

    // Distributor Name field is required
    errors = customerId.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('submitting a form when all the field is entered', () => {
    expect(component.allocateForm.valid).toBeFalsy();
    component.allocateForm.controls['distributorName'].setValue("A4solar");
    component.allocateForm.controls['purchaseDate'].setValue("Mon Jan 04 2020 11:30:54 GMT+0530 (India Standard Time)");
    component.allocateForm.controls['installationDate'].setValue("Mon Jan 11 2020 11:30:54 GMT+0530 (India Standard Time)");
    component.allocateForm.controls['customerId'].setValue("1001");
    expect(component.allocateForm.valid).toBeTruthy();
  });

  it('should invoke service on submitting the form', () => {
    // const formValue = {
    //   value: {
    //     distributorName : 'A4solar',
    //     purchaseDate : new Date(2019, 11, 4, 20, 32, 30, 0),
    //     installationDate : new Date(2019, 11, 12, 20, 32, 30, 0),
    //     customerId : 1001
    //   }
    // };

    component.allocateForm.controls['distributorName'].setValue("A4solar");
    component.allocateForm.controls['purchaseDate'].setValue("Mon Jan 04 2020 11:30:54 GMT+0530 (India Standard Time)");
    component.allocateForm.controls['installationDate'].setValue("Mon Jan 11 2020 11:30:54 GMT+0530 (India Standard Time)");
    component.allocateForm.controls['customerId'].setValue("1001");

    const spy = spyOn(allocateService, 'getData').and.returnValue(of({message: 'Solar Heater 2006 successfully allocated to customer 1005'}));

    allocateService.getData(component.allocateForm.value)

    component.register();

    expect(spy).toHaveBeenCalledWith(component.allocateForm.value);

    expect(component.successMessage).toEqual('Solar Heater 2006 successfully allocated to customer 1005');
  });

  it('should display error message submitting the form', () => {
    spyOn(allocateService, 'getData').and.returnValue(throwError({error: {message: 'Customer ID already taken'}}));

    component.register();
    expect(component.errorMessage).toEqual('Customer ID already taken');
  });

});
