import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../services/cars.service';
import { CarDisplayMain } from '../../../shared/car-display-main';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})
export class Home2Component implements OnInit {

  gridColumns = 4;
  carsDisplay: CarDisplayMain[]  = [];
  isCompleted:boolean = true;

  constructor(private api: CarsService) { }

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
