import { CarsService } from './../services/cars.service';
import { Car } from 'src/app/shared/car.model';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  @ViewChildren(DataTableDirective) dtElements!: QueryList<DataTableDirective>;

  marcaFiltro!: string | null;
  cars!: Car[];

  isCompleted: boolean = true;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions!: DataTables.Settings;

  constructor(
    private api: CarsService
  ) { }

  ngOnInit(): void {
  }

  buscar() {
    this.api.getCars().subscribe({
      next: (data) => {
        console.log("cars: ", data);
        this.cars = data.map(elem => {
          var c = new Car();

          c!.id = elem.id;
          c!.brand = elem.brand;
          c!.img = elem.img;
          c!.kilometers = elem.kilometers;
          c!.model = elem.model;
          c!.price = elem.price;
          c!.transmission = elem.transmission;
          c!.year = elem.year;

          // if (elem) {
          //   let imgs = elem.img;
          //   if (imgs) {
          //     let imgPos = imgs.filter(imgs => imgs.position == 0);
          //     c!.imgMain = imgPos[0].name;
          //   } else {
          //     c!.imgMain = "";
          //   }
          // }

          return c!;

        });
      },
      error: (e) => {
        throw new Error('Error cargando información');
      },
      complete: () => {
        this.isCompleted = false;
      }
    });
  }

  limpiarFiltros() {

  }

  agregar() {

  }

  seleccionar(car: Car, callType: string) {

  }

  eliminar(car: Car) {

  }

  cancelarEdicion() {

  }

  guardar() {

  }
}
