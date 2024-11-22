export interface IPropertyType{
    propertTypeId: number;
    propertyType: string
}

export interface IApiResponsibleModel{
    message:string,
    result: number;
    data: any
}

export class Site {
    siteId: number;
    siteTitle: string;
    location: string;
    propertyTypeId: number;
    city: string;
    pincode: string;
    state: string;
    totalProperties: number;
    createdDate: Date;
    lastUpdatedDate: Date;
  
    constructor(data: Partial<Site> = {}) {
      this.siteId = data.siteId ?? 0;
      this.siteTitle = data.siteTitle ?? '';
      this.location = data.location ?? '';
      this.propertyTypeId = data.propertyTypeId ?? 0;
      this.city = data.city ?? '';
      this.pincode = data.pincode ?? '';
      this.state = data.state ?? '';
      this.totalProperties = data.totalProperties ?? 0;
      this.createdDate = data.createdDate ? new Date(data.createdDate) : new Date();
      this.lastUpdatedDate = data.lastUpdatedDate ? new Date(data.lastUpdatedDate) : new Date();
    }
  }

export interface property{
    propertyId:number;
    propertyNo: number;
    facing: string;
    totalArea: string;
    rate: number;
    siteId: number
}
