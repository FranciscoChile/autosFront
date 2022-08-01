import { Component, OnInit } from '@angular/core';
import { CarClass } from '../car-class.model';
import { CarsService } from '../cars.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  gridColumns = 5;

  cars: CarClass[]  = [];

  constructor(private api: CarsService) {}

  getCars(){
    this.api.getCars().subscribe(data => {
      this.cars=data;
    });
  }

  ngOnInit(): void {
    this.getCars();
  }

}
