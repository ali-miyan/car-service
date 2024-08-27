export interface IServiceData {
    serviceName: string;
    description: string;
    logoUrl: string | null;
    subServices: object[];
  }
  
  export class  Service {
    serviceName: string;
    description: string;
    logoUrl: string | null;
    subServices: object[];
  
    constructor({ serviceName, description, logoUrl, subServices }: IServiceData) {
      this.serviceName = serviceName;
      this.description = description;
      this.logoUrl = logoUrl;
      this.subServices = subServices;
    }
  }
  