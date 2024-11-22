import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IApiResponsibleModel, IPropertyType } from '../../model.ts/master';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-property-type',
  standalone: true,
  imports: [ReactiveFormsModule,],
  templateUrl: './property-type.component.html',
  styleUrl: './property-type.component.css'
})
export class PropertyTypeComponent implements OnInit {

masterSrv =  inject(MasterService);

form : FormGroup = new FormGroup({
});

gridData:IPropertyType[] = [];

constructor(){
  this.initializeform();
}

ngOnInit(): void {
this.getGridData();
}

getGridData(){
  this.masterSrv.getAllPropertyType().subscribe((res:IApiResponsibleModel)=>{
    this.gridData=res.data;
  })
}

initializeform(item?:IPropertyType){
  this.form = new FormGroup({
    propertyTypeId : new FormControl<number>(item?item.propertTypeId:0),
    propertyType : new FormControl<string>(item?item.propertyType:'',{
      validators:[Validators.required, Validators.minLength(3) ]
    }),
  })
}

onUpdate(){
  this.masterSrv.updatePropertyType(this.form.value).subscribe((res:IApiResponsibleModel) => {
    if(res.result){
      alert('Record updated')
      this.getGridData();
    } else{
      alert(res.message)
    }
  })
}

onSave(){
  this.masterSrv.savePropertyType(this.form.value).subscribe((res:IApiResponsibleModel) => {
    if(res.result){
      alert('Record Saved')
      this.getGridData();
    } else{
      alert(res.message)
    }
  })
}

onEdit(item:IPropertyType){
  console.log(item)
this.initializeform(item)
}

onDelete(id:number){
const isDelete = confirm('are you sure want to delete')
if(isDelete){
  this.masterSrv.deletePropertyTypeById(id).subscribe((res:IApiResponsibleModel) => {
    if(res.result){
      alert('Record deleted')
      this.getGridData();
    } else{
      alert(res.message)
    }
  })
}
}
}
