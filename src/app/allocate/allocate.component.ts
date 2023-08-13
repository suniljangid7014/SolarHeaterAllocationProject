import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AllocateServiceService } from './allocate-service.service';
import { SolarAllocationListService } from '../solar-allocation-list/solar-allocation-list.service';
import { map } from 'rxjs';
import { SolarHeater } from '../shared/SolarHeater';

@Component({
  selector: 'app-allocate',
  templateUrl: './allocate.component.html',
  styleUrls: ['./allocate.component.css']
})
export class AllocateComponent implements OnInit {
  allocateForm!: FormGroup;
  errorMessage!:string;
  successMessage!:string; 
  newSolarHeaterId!:number;

  constructor(private fb:FormBuilder, private solarAllocationListService:SolarAllocationListService, private allocateServiceService:AllocateServiceService) { }

  

  ngOnInit() {
    this.allocateForm = this.fb.group({
      distributorName:['', [Validators.required]],
      purchaseDate:[''],
      installationDate:[''],
      customerId:['', Validators.required]
    })
  }

  get name(){
    return this.allocateForm.get('distributorName')
  }
  get id(){
    return this.allocateForm.get('customerId')
  }

  register(val:any) {

    this.solarAllocationListService.getAllocations().pipe(
      map(solarHeaterId=> Math.max(...solarHeaterId))
    ).subscribe((result)=>{
      if(result){
        this.newSolarHeaterId = result+1
        console.log(this.newSolarHeaterId)
        
        let obj = new SolarHeater();
        obj.solarHeaterId = this.newSolarHeaterId
        obj.distributorName = val.distributorName
        obj.purchaseDate = val.purchaseDate
        obj.installationDate = val.installationDate
        obj.customerid = val.customerId

        this.allocateServiceService.getData(obj).subscribe((res)=>{
          if(res){
            this.successMessage = `Solar Heater ${this.newSolarHeaterId} successfully allocated to customer ${val.customerId}`
            setTimeout(() => {
              this.successMessage = ''
            }, 5000);
          }else{
            this.errorMessage = "Something went wrong!!"
            setTimeout(() => {
              this.errorMessage = ''
            }, 3000);
          }
        })

      }
    })
  }

}
