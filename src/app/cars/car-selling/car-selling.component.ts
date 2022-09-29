import { Component, OnInit } from '@angular/core';
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
  
  filter = {};

  fields = {
    type: '',
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
          c!.price = elem.price;
          c!.transmission = elem.transmission;
          c!.year = elem.year;
          c!.fuel = elem.fuel;
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

}
