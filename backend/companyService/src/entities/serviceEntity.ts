interface SubServiceInfo {
  _id: string;
  name: string;
}

interface SubService {
  subServices: SubServiceInfo[];
  detail: {
    price: number;
    workingHours: number;
  };
}

export interface IService {
  _id?: any;
  generalServiceId: string;
  companyId: string;
  selectedHours: string;
  servicePlace: string;
  servicesPerDay: string;
  terms: string;
  images: string[];
  basicPackage: SubService;
  standardPackage: SubService;
  premiumPackage: SubService;
  isBlocked: boolean;
}

export class Service {
  _id?: any;
  generalServiceId: string;
  companyId: string;
  selectedHours: string;
  servicePlace: string;
  servicesPerDay: string;
  terms: string;
  images: string[];
  basicPackage: SubService;
  standardPackage: SubService;
  premiumPackage: SubService;
  isBlocked: boolean;

  constructor({
    _id,
    generalServiceId,
    companyId,
    selectedHours,
    servicePlace,
    servicesPerDay,
    terms,
    images,
    basicPackage,
    standardPackage,
    premiumPackage,
    isBlocked,
  }: IService) {
    this._id = _id;
    this.generalServiceId = generalServiceId;
    this.companyId = companyId;
    this.selectedHours = selectedHours;
    this.servicePlace = servicePlace;
    this.servicesPerDay = servicesPerDay;
    this.terms = terms;
    this.images = images;
    this.basicPackage = basicPackage;
    this.standardPackage = standardPackage;
    this.premiumPackage = premiumPackage;
    this.isBlocked = isBlocked;
  }
}
