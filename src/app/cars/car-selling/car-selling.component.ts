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

}
