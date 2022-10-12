import { Component, OnInit, Input } from '@angular/core';
import { Car } from '../../shared/car.model';
import { CarsService } from '../services/cars.service';
import { CarDisplayMain } from '../../shared/car-display-main';

@Component({
  selector: 'app-car-selling',
  templateUrl: './car-selling.component.html',
  styleUrls: ['./car-selling.component.css']
})
export class CarSellingComponent implements OnInit {

  gridColumns = 4;
  cars: Car[]  = [];
  carsDisplay: CarDisplayMain[]  = [];
  search : any;
  isCompleted:boolean = true;  
  typeVehicleCheck = '';
  pressButton1 = '';
  pressButton2 = '';
  pressButton3 = '';
  pressButton4 = '';
  pressButton5 = '';
  pressButton6 = '';
  pressButton7 = '';

  filter = {};

  fields = {
    typeVehicle: '',
    priceFrom: '',
    priceTo: '',
    yearFrom: '',
    yearTo: '',
    brand: '',
    fuel: '',
    transmission: '',
    engine: ''
  };

  page: number = 1;
  count: number = 0;
  tableSize: number = 12;

  constructor(private api: CarsService) {}

  getCars(){

    let pesosCL = Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "CLP"
    });

    this.api.getCars().subscribe({
      next: (data) => {
        this.carsDisplay = data.map(elem => {
          var c  = new CarDisplayMain();
  
          c!.id = elem.id;
          c!.brand = elem.brand;
          c!.img = elem.img;
  
          if (elem) {
            let imgs = elem.img;
            if (imgs) {
              let imgPos = imgs.filter(imgs => imgs.position == 0 );
              c!.imgMain = imgPos[0].name;  
            } else {
              c!.imgMain = "";
            }
          }
          
          c!.kilometers = elem.kilometers;
          c!.model = elem.model;
          c!.price = pesosCL.format(elem.price).replace('CLP','');                    
          c!.transmission = elem.transmission;
          c!.year = elem.year;
          c!.fuel = elem.fuel;
          c!.typeVehicle = elem.typeVehicle;
          return c!;        
          
        });
      },
      error: (e) => {
        throw new Error('Error cargando información');
      },
      complete: () => {
        this.isCompleted=false;
      }
    });

    
    
  }

  ngOnInit(): void {
    this.getCars();
  }

  updateFilters() {
    Object.keys(this.fields).forEach(
      key => this.fields[key as keyof typeof this.fields] === '' ? delete this.fields[key as keyof typeof this.fields] : key);
    this.filter = Object.assign({}, this.fields);
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getCars();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getCars();
  }

  filterType(typeVehicle: string) {
    
    this.pressButton1 = '';
    this.pressButton2 = '';
    this.pressButton3 = '';
    this.pressButton4 = '';
    this.pressButton5 = '';
    this.pressButton6 = '';
    this.pressButton7 = '';

    if (typeVehicle == 'citycar') {
      this.typeVehicleCheck = 'citycar';
      this.pressButton1 = 'pressButton';
    }
    if (typeVehicle == 'electric') {
      this.typeVehicleCheck = 'electric';
      this.pressButton2 = 'pressButton';
    }
    if (typeVehicle == 'hatchback') {
      this.typeVehicleCheck = 'hatchback';
      this.pressButton3 = 'pressButton';
    }
    if (typeVehicle == 'minivan') {
      this.typeVehicleCheck = 'minivan';
      this.pressButton4 = 'pressButton';
    }
    if (typeVehicle == 'pickup') {
      this.typeVehicleCheck = 'pickup';
      this.pressButton5 = 'pressButton';
    }
    if (typeVehicle == 'sedan') {
      this.typeVehicleCheck = 'sedan';
      this.pressButton6 = 'pressButton';
    }
    if (typeVehicle == 'suv') {
      this.typeVehicleCheck = 'suv';
      this.pressButton7 = 'pressButton';
    }

    this.fields.typeVehicle = typeVehicle;
    this.updateFilters();
  }

  filterCheck(valueCheck: string) {
    this.fields.typeVehicle = valueCheck;
    this.updateFilters();
  }

}
