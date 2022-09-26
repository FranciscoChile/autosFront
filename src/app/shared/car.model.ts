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
    type!: string;
    engine!: string;
    
}
