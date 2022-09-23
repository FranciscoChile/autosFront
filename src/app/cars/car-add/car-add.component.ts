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
    // publicationPrice: new FormControl('', Validators.required)
  });

  formTemplates!: FormTemplate[];

  files: any = [];
  filesToDisplay: any = [];
  isCompleted: boolean = true;

  formOwner = new FormGroup({});
  formDocumentation = new FormGroup({});
  formEquipment = new FormGroup({});
  formIndoorConditions = new FormGroup({});
  formElectricController = new FormGroup({});
  formMechanicRevision = new FormGroup({});
  formBodyworkEvaluation = new FormGroup({});

  options: FormlyFormOptions = {};

  modelOwner = {};
  fieldsOwner: FormlyFieldConfig[] = [];

  modelDocumentation = {};
  fieldsDocumentation: FormlyFieldConfig[] = [];

  modelEquipment = {};
  fieldsEquipment: FormlyFieldConfig[] = [];

  modelIndoorConditions = {};
  fieldsIndoorConditions: FormlyFieldConfig[] = [];

  modelElectricController = {};
  fieldsElectricController: FormlyFieldConfig[] = [];

  modelBodyworkEvaluation = {};
  fieldsBodyworkEvaluation: FormlyFieldConfig[] = [];

  modelMechanicRevision = {};
  fieldsMechanicRevision: FormlyFieldConfig[] = [];

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

        this.loadFormTemplate("owner");
        // let template = this.formTemplates.find(pr => pr.name == "owner")!;

        // this.fieldsOwner = JSON.parse(template.definition);
        // this.formOwner = new FormGroup({});
        // this.modelOwner = {};
      }

    });
    this.isCompleted = false;
  }

  loadFormTemplate(name: string) {
    let template = this.formTemplates.find(pr => pr.name == name)!;
    console.log("template:", template);

    switch (name) {
      case "owner":
        this.fieldsOwner = JSON.parse(template.definition);
        this.formOwner = new FormGroup({});
        this.modelOwner = {};
        break;

      case "documentation":
        this.fieldsDocumentation = JSON.parse(template.definition);
        this.formDocumentation = new FormGroup({});
        this.modelDocumentation = {};
        break;

      case "equipment":
        this.fieldsEquipment = JSON.parse(template.definition);
        this.formEquipment = new FormGroup({});
        this.modelEquipment = {};
        break;

      case "indoorConditions":
        this.fieldsIndoorConditions = JSON.parse(template.definition);
        this.formIndoorConditions = new FormGroup({});
        this.modelIndoorConditions = {};
        break;

      case "electricController":
        this.fieldsElectricController = JSON.parse(template.definition);
        this.formElectricController = new FormGroup({});
        this.modelElectricController = {};
        break;

      case "bodyworkEvaluation":
        this.fieldsBodyworkEvaluation = JSON.parse(template.definition);
        this.formBodyworkEvaluation = new FormGroup({});
        this.modelBodyworkEvaluation = {};
        break;

      case "mechanicRevision":
        this.fieldsMechanicRevision = JSON.parse(template.definition);
        this.formMechanicRevision = new FormGroup({});
        this.modelMechanicRevision = {};
        break;

      default:
        break;
    }


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
