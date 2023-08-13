import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { SolarHeater } from '../shared/SolarHeater';


@Injectable()
export class AllocateServiceService {

  constructor(private http:HttpClient) { }
  
  allocateUrl: string = 'http://localhost:3000/Solarheaterallocation';
   
  
  getData(data:any) : Observable<any> {
    // replace the below return with required statement to return an Observable as mentioned in QP
    console.log("Data in getData: "+JSON.stringify(data))
    return this.http.post<any>(this.allocateUrl,data, {observe:'response'});
  }
}
