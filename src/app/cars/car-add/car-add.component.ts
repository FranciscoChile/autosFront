import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarsService } from '../services/cars.service';
import { FormTemplateService } from '../services/form-template.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { FormlyFieldConfig, FormlyFormBuilder, FormlyFormOptions } from '@ngx-formly/core';
import Swal from 'sweetalert2';
import { FormTemplate } from 'src/app/shared/form-template.model';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carForm = new FormGroup({
    brand: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    kilometers: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    transmission: new FormControl('', Validators.required),
    // vehiclePlate: new FormControl('', Validators.required),
    // vin: new FormControl('', Validators.required),
    // chassisNumber: new FormControl('', Validators.required),
    // motorNumber: new FormControl('', Validators.required),
    // autofactPrice: new FormControl('', Validators.required),
    // publicationPrice: new FormControl('', Validators.required),
    // owner: new FormGroup({
    //   firstName: new FormControl('', Validators.required),
      // lastName: new FormControl('', Validators.required),
      // citizenShip: new FormControl('', Validators.required),
      // birthDate: new FormControl('', Validators.required),
      // address: new FormControl('', Validators.required),
      // commune: new FormControl('', Validators.required),
      // region: new FormControl('', Validators.required),
      // country: new FormControl('', Validators.required),
      // cellPhone: new FormControl('', Validators.required),
      // responsibleName: new FormControl('', Validators.required),
      // responsibleCellPhone: new FormControl('', Validators.required),
      // publicAddress: new FormControl('', Validators.required),
      // daysToShow: new FormControl('', Validators.required),
      // hoursToShow: new FormControl('', Validators.required)
    // }),
    // documentation: new FormGroup({
    //   vehiclePlate: new FormControl('', Validators.required),
    // })
  });

  formTemplates!: FormTemplate[];

  files: any = [];
  filesToDisplay: any = [];
  isCompleted: boolean = true;

  formOwner = new FormGroup({});
  formDocumentation = new FormGroup({});

  options: FormlyFormOptions = {};

  modelOwner = {};
  fieldsOwner: FormlyFieldConfig[] = [];

  modelDocumentation = {};
  fieldsDocumentation: FormlyFieldConfig[] = [];

  constructor(
    private router: Router,
    private api: CarsService,
    private ftService: FormTemplateService,
    private _snackBar: MatSnackBar,
    private builder: FormlyFormBuilder
  ) { }

  ngOnInit() {
    console.log("ejecutando on init");
    this.ftService.getFormTemplates().subscribe(data => {
      if (data && data.length > 0) {
        console.log("data:", data);
        this.formTemplates = data;

        let template = this.formTemplates.find(pr => pr.name == "owner")!;

        this.fieldsOwner = JSON.parse(template.definition);
        this.formOwner = new FormGroup({});
        this.modelOwner = {};
      }

    });
    this.isCompleted = false;
  }

  cancel() {
    console.log("cancelar");
    // let funcioneSubMenuProyecto = sessionStorage.getItem('funcioneSubMenuProyecto');
    // this.router.navigate([funcioneSubMenuProyecto]);
  }

  preOnFormSubmit() {
    console.log("model: " + this.modelOwner);
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Los datos serán almacenados",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.onFormSubmit();
      }
    })
  }

  onFormSubmit(): void {
    this.isCompleted = true;
    var formData = new FormData();
    formData.append("car", JSON.stringify(this.carForm.value));

    this.files.forEach((file: string | Blob) => {
      formData.append("files", file);
    });

    this.api.createCarMultipleImages(formData)
      .subscribe({
        next: (v) => {
          this.files = [];
          formData = new FormData();
          this.carForm.reset();
          //this.router.navigateByUrl('/selling')
        },
        error: (e) => {
          throw new Error('Error en el ingreso de los datos');
        },
        complete: () => {
          this.isCompleted = false;
          this._snackBar.open("Auto creado", "X", { duration: 5000 });
        }
      });

  }

  uploadFile(event: any) {

    const result = event;

    if (result != null) {

      if (result.length != null) {
        for (let index = 0; index < result.length; index++) {
          const element = result[index];
          this.files.push(element)
        }
      } else {
        const files = event.target.files;
        for (let index = 0; index < files.length; index++) {
          const element = files[index];
          this.files.push(element)
        }
      }

    }
  }

  deleteAttachment(index: any) {
    this.files.splice(index, 1)
  }

  cancelEdit() {
    this.router.navigate(['/']);
  }

}
