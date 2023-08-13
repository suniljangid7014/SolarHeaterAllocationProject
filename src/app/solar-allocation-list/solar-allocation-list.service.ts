import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, filter, map, max, of, tap } from 'rxjs';
import { SolarHeater } from '../shared/SolarHeater';

@Injectable({
  providedIn: 'root'
})
export class SolarAllocationListService {

  constructor(private http:HttpClient) { }

  getAllocations() : Observable<number[]>{
    // comment the below return statement and return an Observable as mentioned in QP 
    return this.http.get<number[]>('http://localhost:3000/Solarheaterallocation', {observe:'response'}).pipe(
      map((response: any) => response.body.map((item:any) => item.solarHeaterId))

    )
  }

  getSolarHeaterbyId(id:number) : Observable<SolarHeater>{
    console.log(id)
    return this.http.get<SolarHeater>(`http://localhost:3000/Solarheaterallocation?solarHeaterId=${id}`)
  }
}
