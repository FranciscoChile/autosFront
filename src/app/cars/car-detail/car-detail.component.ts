import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarsService } from '../services/cars.service';
import { CarDisplayMain } from '../../shared/car-display-main';
import { ImageObject } from '../../shared/gallery-detail.model';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDisplay : CarDisplayMain =  {
    id: '',
    brand: '',
    model: '',
    img: [],
    imgMain: '',
    kilometers: 0,
    transmission: '',
    price: 0,
    year: 0,
    fuel: '',
    type: '',
    engine: ''
  };

  imageObject: ImageObject[]  = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: CarsService ) { }

  ngOnInit(): void {
    this.getCar(this.route.snapshot.params['id']);
  }

  getCar(id: string) {

    this.api.getCarById(id).subscribe(data => {

      this.carDisplay.id = data.id;

      let imgs = data.img;
      let imgPos = imgs.filter(imgs => imgs.position == 0 );
      this.carDisplay.imgMain = imgPos[0].name;

      this.imageObject = imgs.map(elem => {

        var c  = new ImageObject();

        c.image = elem.name;
        c.thumbImage = elem.name;        

        return c;
      })


      this.carDisplay.img = data.img;
      this.carDisplay.brand = data.brand;
      this.carDisplay.model = data.model;
      this.carDisplay.year = data.year;
      this.carDisplay.price = data.price;

      
    });


  }


}
