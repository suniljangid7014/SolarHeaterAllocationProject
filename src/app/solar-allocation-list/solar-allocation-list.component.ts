import { Component, OnInit } from '@angular/core';
import { SolarAllocationListService } from './solar-allocation-list.service';
import { SolarHeater } from '../shared/SolarHeater';

@Component({
  selector: 'app-solar-allocation-list',
  templateUrl: './solar-allocation-list.component.html',
  styleUrls: ['./solar-allocation-list.component.css']
})
export class SolarAllocationListComponent implements OnInit {

  constructor( private service:SolarAllocationListService) { }

solarHeaterIds:number[]=[];
selectedSolar!:any;
selectedId!:number;
errorMessage!:string; 


  ngOnInit() {
    this.getAllId();
  }

  displaySelected() {
    this.service.getSolarHeaterbyId(this.selectedId).subscribe(
      (responseObj: any) => {
        if (responseObj) {
          this.selectedSolar = responseObj[0]      
        }
      },
      error => {
        this.errorMessage = 'An error occurred while fetching data.';
      }
    );
  }

  getAllId() {
    this.service.getAllocations().subscribe((data:any[])=>{
      this.solarHeaterIds = data
    })
  }


}
