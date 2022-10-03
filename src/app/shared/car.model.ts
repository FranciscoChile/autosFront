import { CarImage } from "./car-image.model";

export class Car {
    id!: string;
    vehiclePlate!: string;
    vin!: string;
    chassisNumber!: string;
    motorNumber!: string;
    brand!: string;
    model!: string;
    year!: number;
    transmission!: string;
    typeVehicle!: string;
    kilometers!: number;
    price!: number;
    img!: Array<CarImage>;
    fuel!: string;
    engine!: string;
    creationDate!: Date;
    autofactPrice!: number;
    publicationPrice!: number;
    owner!: string;
    documents!: string;
    equipments!: string;
    indoorConditions!: string;
    electricController!: string;
    mechanicRevision!: string;
    bodyworkEvaluation!: string;
}
