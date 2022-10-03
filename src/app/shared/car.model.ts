import { CarImage } from "./car-image.model";

export class Car {
    id!: string;
    brand!: string;
    model!: string;
    year!: number;
    kilometers!: number;
    price!: number;
    img!: Array<CarImage>;
    transmission!: string;
    fuel!: string;
    typeVehicle!: string;
    engine!: string;
    vehiclePlate!: string;
    vin!: string;
    chassisNumber!: string;
    motorNumber!: string;
    creationDate!: string;
    autofactPrice!: number;
    publicationPrice!: number;
    equipments!: string;


    
}
