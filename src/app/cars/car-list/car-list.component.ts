import { Router } from '@angular/router';
import { DatatablesService } from './../services/datatables.service';
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
  cars: Array<Car> = [];

  // isCompleted: boolean = true;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    private api: CarsService,
    private datatableService: DatatablesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dtOptions = this.datatableService.settings([[1, 'asc']], [0]);
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   processing: true
    // };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  buscar() {
    console.log("filtros: ", this.marcaFiltro);
    this.api.getCars(this.marcaFiltro?.trim()).subscribe({
      next: (data) => {
        console.log("cars: ", data);

        let tempCars = data.map(elem => {
          var c = new Car();

          c!.id = elem.id;
          c!.vehiclePlate = elem.vehiclePlate;
          c!.vin = elem.vin;
          c!.chassisNumber = elem.chassisNumber;
          c!.motorNumber = elem.motorNumber;
          c!.brand = elem.brand;
          c!.model = elem.model;
          c!.year = elem.year;
          c!.transmission = elem.transmission;
          c!.typeVehicle = elem.typeVehicle;
          c!.kilometers = elem.kilometers;
          c!.price = elem.price;
          c!.img = elem.img;
          c!.fuel = elem.fuel;
          c!.engine = elem.engine;
          c!.creationDate = elem.creationDate;
          c!.autofactPrice = elem.autofactPrice;
          c!.publicationPrice = elem.publicationPrice;
          c!.owner = elem.owner;
          c!.documents = elem.documents;
          c!.equipments = elem.equipments;
          c!.indoorConditions = elem.indoorConditions;
          c!.electricController = elem.electricController;
          c!.mechanicRevision = elem.mechanicRevision;
          c!.bodyworkEvaluation = elem.bodyworkEvaluation;

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

        this.cars = this.datatableService.procesarRespuesta<Car>(this.cars, tempCars, <DataTableDirective>this.dtElements.get(0), this.dtTrigger);

      },
      error: (e) => {
        throw new Error('Error cargando información');
      },
      // complete: () => {
      //   this.isCompleted = false;
      // }
    });
  }

  limpiarFiltros() {
    this.cars = this.datatableService.limpiarRegistros<Car>(this.cars, <DataTableDirective>this.dtElements.get(0), this.dtTrigger);
  }

  agregar() {

  }

  seleccionar(car: Car, accion: 'VER' | 'MOD' | 'EL'): any {
    console.log("SELECCIONAR: ", car, accion);
    switch (accion) {
      case 'VER':
        console.log("VER SELECCIONADO");
        break;
      case 'MOD':
        console.log("MOD SELECCIONADO");
        this.router.navigate(['edit'], { state: { car: car }});
        break;

      default:
        break;
    }

  }

  eliminar(car: Car) {
    console.log("ELIMINAR: ", car);

  }

}
