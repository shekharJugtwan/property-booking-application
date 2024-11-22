import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IApiResponsibleModel, property, Site } from '../../model.ts/master';
import { MasterService } from '../../services/master.service';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  propertyList:property[]=[];
site$: Observable<Site[]>= new Observable<Site[]>;
masterSrv = inject(MasterService)
bookingForm:FormGroup = new FormGroup({});
currentPropertyId=0;


intializationForm(){
  this.bookingForm = new FormGroup({
    bookingId: new FormControl(0, Validators.required), // Default value 0 with required validation
    propertyId: new FormControl(this.currentPropertyId, Validators.required), // Property ID
    bookindDate: new FormControl(new Date().toISOString(), Validators.required), // Current ISO date
    bookingRate: new FormControl(0, [Validators.required, Validators.min(1)]), // Minimum booking rate
    totalAmont: new FormControl(0, [Validators.required, Validators.min(1)]), // Minimum total amount
    custId: new FormControl(0, Validators.required), // Customer ID
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]), // Name with max length
    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{10}$/), // Mobile pattern for 10-digit numbers
    ]), // Mobile field
    emailid: new FormControl('', [Validators.required, Validators.email]), // Email validation
    address: new FormControl('', [Validators.required, Validators.maxLength(250)]), // Address validation
  });
}
constructor(){
  this.intializationForm();
  this.site$ = this.masterSrv.getAllSites().pipe(map((res:IApiResponsibleModel) => res.data))
}

getproperties(event:Event){
  this.masterSrv.getAllPropertiesBySite(Number((event.target as HTMLSelectElement).value)).subscribe((res:IApiResponsibleModel) =>{
    this.propertyList = res.data
  })
}

openModal(data:property){
  this.currentPropertyId = data.propertyId
  this.intializationForm();
const modal=document.getElementById('modal')

  if(modal){
    modal.style.display='block'
  }
}

closeModal(){
const modal=document.getElementById('modal')
  if(modal){
    modal.style.display='none'
  }
}

onBooking(){
  this.masterSrv.saveBooking(this.bookingForm.value).subscribe((res:IApiResponsibleModel) =>{
    if(res.result){
      alert('property successfully booked');
     
    }
    else{
      alert(res.message)
    }
    
  })
}

getbookedproperties(){
  this.masterSrv.getAllPropertiesbookedBySite(this.currentPropertyId).subscribe((res:IApiResponsibleModel) =>{
    this.propertyList = res.data
  })
}

}
