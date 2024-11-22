import { Component, ElementRef, inject, OnInit, signal, ViewChild, viewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IApiResponsibleModel, IPropertyType, property, Site } from '../../model.ts/master';
import { MasterService } from '../../services/master.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { error } from 'console';
import { Block } from '@angular/compiler';

@Component({
  selector: 'app-site',
  standalone: true,
  imports : [FormsModule ,AsyncPipe,CommonModule,ReactiveFormsModule ],
  templateUrl: './site.component.html',
  styleUrl: './site.component.css'
})
export class SiteComponent implements OnInit{

isFormView = signal<boolean>(false);
formObj:Site = new Site();
gridData: Site[] = [];
siteProperties: property[] =[];
masterSrv = inject(MasterService);
private modal = viewChild.required<ElementRef<HTMLFormElement>>('propertyModal')
// @ViewChild('propertyModal')modal?:ElementRef;
currentSiteId:number = 0;

propertyTypeId$:Observable<IPropertyType[]> = new Observable<IPropertyType[]>

propertyForm: FormGroup = new FormGroup({})

constructor(){
  this.propertyTypeId$ = this.masterSrv.getAllPropertyType().pipe(
    map((item:IApiResponsibleModel) => {
      return item.data
    })
  );
  this.initializeForm();
}

ngOnInit(): void {
  this.getGridData();
}

initializeForm(){
  this.propertyForm = new FormGroup({
    propertyId: new  FormControl(0),
    propertyNo: new  FormControl(''),
    facing: new  FormControl(''),
    totalArea: new  FormControl(''),
    rate: new  FormControl(''),
    siteId: new  FormControl(this.currentSiteId),
  })
  console.log("form is being initialized"+  this.currentSiteId);
}

getGridData(){
  this.masterSrv.getAllSites().subscribe((res:IApiResponsibleModel) =>{
   this.gridData = res.data;
  })
}

openModal(data:Site){
  this.currentSiteId= data.siteId;
  this.initializeForm();

  if(this.modal){
    this.modal().nativeElement.style.display='block'
    this.getSiteProperties();
  }
}

closeModal(){
  if(this.modal){
    this.modal().nativeElement.style.display='none'
  }
}

toggleView(){
  this.isFormView.set(!this.isFormView());
}

onSave(){
  this.masterSrv.saveSite(this.formObj).subscribe((res:IApiResponsibleModel) =>{
    if(res.result){
      alert('Record saved');
      this.toggleView();
      this.getGridData();
    }
    else{
      alert(res.message)
    }
    
  })
}

onEdit(data: Site){
this.formObj= data;
this.toggleView();
}

onUpdate(){
  this.masterSrv.updateSites(this.formObj).subscribe((res:IApiResponsibleModel) =>{
    if(res.result){
      alert('site updated');
      this.toggleView();
      this.getGridData();
      this.formObj= new Site();
    }
    else{
      alert(res.message)
    }
    
  })
}

onDelete(value:Site){
  const confirmDelete = confirm('Are you sure you want to Delete');
  if(confirmDelete){
    this.masterSrv.deleteSite(value.siteId).subscribe((res:IApiResponsibleModel) =>{
      if(res.result){
        alert('Site deleted');
        this.getGridData();
      }
      else{
        alert(res.message)
      }
      
    }) }  
}

onSaveProperty(){
  this.masterSrv.saveProperty(this.propertyForm.value).subscribe((res:IApiResponsibleModel) =>{
    if(res.result){
      alert('Record saved');
      this.getSiteProperties();
    }
    else{
      alert(res.message)
    }
    
  })
}

getSiteProperties(){
  this.masterSrv.getAllPropertiesBySite(this.currentSiteId).subscribe((res:IApiResponsibleModel) =>{
    
   this.siteProperties = res.data;
   console.log(res.data);
  })
}

}
