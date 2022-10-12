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
    price: '',
    year: 0,
    fuel: '',
    typeVehicle: '',
    engine: '',
    equipment: '',
  };

  imageObject: ImageObject[]  = [];

  equipmentObject: any[] | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: CarsService ) { }

  ngOnInit(): void {
    this.getCar(this.route.snapshot.params['id']);
  }

  getCar(id: string) {

    let pesosCL = Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "CLP"
    });

    this.api.getCarById(id).subscribe(data => {

      this.carDisplay.id = data.id;
      let imgPos;

      let imgs = data.img;

      if (imgs) {
        imgPos = imgs.filter(imgs => imgs.position == 0 );
        this.carDisplay.imgMain = imgPos[0].name;
      
        this.imageObject = imgs.map(elem => {

          var c  = new ImageObject();

          c.image = elem.name;
          c.thumbImage = elem.name;        

          return c;
        })

      }
      this.carDisplay.img = data.img;
      this.carDisplay.brand = data.brand;
      this.carDisplay.model = data.model;
      this.carDisplay.year = data.year;
      this.carDisplay.price = pesosCL.format(data.price).replace('CLP','');
      this.carDisplay.typeVehicle = data.typeVehicle;
      this.carDisplay.kilometers = data.kilometers;
      this.carDisplay.transmission = data.transmission;

      
      let str: any = JSON.parse(data.equipments);
      console.log(str)  

      var outputArray = [];  
      for (let element in str) {

          if (str[element]) {
            var label = '';
            if (element == 'equip_air_conditioning') label = 'Aire acondicionado';
            if (element == 'equip_radio') label = 'Radio'
            if (element == 'equip_radio_size') label = 'Tamaño radio ' + str[element] + '"';
            if (element == 'equip_radio_digital_panel') label = 'Panel digital';
            if (element == 'equip_blind_spot_detection') label = 'Detección punto ciego';
            if (element == 'equip_back_camera') label = 'Cámara trasera';
            if (element == 'equip_airbag_quantity') label = str[element] + ' Airbags';
            if (element == 'equip_change_lane_assistant') label = 'Asistente cambio carril';
            if (element == 'equip_cruise_control') label = 'Control crucero';
            if (element == 'equip_intelligent_cruise_control') label = 'Control crucero inteligente';
            if (element == 'equip_immobilizer') label = 'Inmobilizador';
            if (element == 'equip_power_button') label = 'Botón encendido';
            if (element == 'equip_spare_tire_size') label = 'Tamaño neumatico repuesto ' + str[element] + '"';
            if (element == 'equip_acc_extra_1') label = 'Accesorio Extra 1';
            if (element == 'equip_acc_extra_2') label = 'Accesorio Extra 2';
            if (element == 'equip_acc_extra_3') label = 'Accesorio Extra 3';          
            if (element == 'equip_back_sensor') label = 'Sensor retroceso';
            if (element == 'equip_brake_assistant') label = 'Asistente frenado';
            if (element == 'equip_climate_control') label = 'Climatizador';
            if (element == 'equip_keyless') label = 'Keyless';
            if (element == 'equip_safety_films') label = 'Láminas de seguridad';
            if (element == 'equip_safety_kit') label = 'Kit de seguridad';
            if (element == 'equip_steering_wheel_radio_control') label = 'Control radio en manubrio';

            outputArray.push({  
              key: label
            });  
          }
      }  
    

      this.equipmentObject = outputArray;

      
      
    });


  }


}
