import { CarImage } from "./car-image.model";

export class CarDisplayMain {
    id!: string;
    brand!: string;
    model!: string;
    img!: Array<CarImage>;
    imgMain!: string;
    kilometers!: number;
    transmission!: string;
    price!: number;
    year!: number;
    fuel!: string;
    typeVehicle!: string;
    engine!: string;
    equipment!: string;
}