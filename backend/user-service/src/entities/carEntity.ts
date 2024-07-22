export interface ICarData {
    _id?:any;
    name: string;
    color:string;
    src: string;
    vin: string;
  }
  
  export class  Car {
    _id?:any;
    name: string;
    color:string;
    src: string;
    vin: string;
  
    constructor({_id, name, color, src, vin }: ICarData) {
      this._id = _id;
      this.name = name;
      this.color = color;
      this.src = src;
      this.vin = vin;
    }
  }
  