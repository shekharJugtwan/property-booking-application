import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IApiResponsibleModel, IPropertyType, Site } from '../model.ts/master';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
private http = inject(HttpClient);

getAllPropertyType():Observable<IApiResponsibleModel>{
  return this.http.get<IApiResponsibleModel>(environment.API_URL + 'GetAllPropertyType'
  )
}

savePropertyType(obj:IPropertyType):Observable<IApiResponsibleModel>{
  const newObj=[obj]
  return this.http.post<IApiResponsibleModel>(environment.API_URL + 'AddPropertyType',newObj
  )
}

updatePropertyType(obj:IPropertyType):Observable<IApiResponsibleModel>{
  return this.http.put<IApiResponsibleModel>(environment.API_URL + 'UpdatePropertyType',obj
  )
}

deletePropertyTypeById(id:number):Observable<IApiResponsibleModel>{
  console.log(id)
  return this.http.delete<IApiResponsibleModel>(environment.API_URL + 'DeletePropertyTypeById?id='+ id
  )
}


saveSite(obj:Site):Observable<IApiResponsibleModel>{
  return this.http.post<IApiResponsibleModel>(environment.API_URL + 'AddSites',obj
  )
}

getAllSites():Observable<IApiResponsibleModel>{
  return this.http.get<IApiResponsibleModel>(environment.API_URL + 'GetAllSites'
  )
}

updateSites(obj:Site):Observable<IApiResponsibleModel>{
  return this.http.put<IApiResponsibleModel>(environment.API_URL + 'UpdateSites',obj
  )
}

deleteSite(id:number):Observable<IApiResponsibleModel>{
  console.log(id)
  return this.http.delete<IApiResponsibleModel>(environment.API_URL + 'DeleteSitesById?id='+ id
  )
}

saveProperty(obj:Site):Observable<IApiResponsibleModel>{
  return this.http.post<IApiResponsibleModel>(environment.API_URL + 'AddPropertyMasters',obj
  )
} 

getAllPropertiesBySite(id:number):Observable<IApiResponsibleModel>{
  return this.http.get<IApiResponsibleModel>(environment.API_URL + 'GetAllPropertyBySiteId?siteid='+id
  )
}

saveBooking(obj:Site):Observable<IApiResponsibleModel>{
  return this.http.post<IApiResponsibleModel>(environment.API_URL + 'AddPropertyBooking',obj
  )
} 
getAllPropertiesbookedBySite(id:number):Observable<IApiResponsibleModel>{
  return this.http.get<IApiResponsibleModel>(environment.API_URL + 'GetAllPropertyBookingBySiteId?siteid='+id
  )
}

}
