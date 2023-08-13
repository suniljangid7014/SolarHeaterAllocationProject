import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllocateComponent } from './allocate/allocate.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {AllocateServiceService} from './allocate/allocate-service.service';
import { SolarAllocationListComponent } from './solar-allocation-list/solar-allocation-list.component';
import {SolarAllocationListService} from './solar-allocation-list/solar-allocation-list.service';
import { DaysCountPipe } from './days-count.pipe';

 

@NgModule({
  declarations: [
    AppComponent,
    AllocateComponent,
    SolarAllocationListComponent,
    DaysCountPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AllocateServiceService, SolarAllocationListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
