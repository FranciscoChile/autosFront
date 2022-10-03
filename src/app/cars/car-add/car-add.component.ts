import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarsService } from '../services/cars.service';
import { FormTemplateService } from '../services/form-template.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { FormlyFieldConfig, FormlyFormBuilder, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import Swal from 'sweetalert2';
import { FormTemplate } from 'src/app/shared/form-template.model';
import {
  CdkDragDrop,
  CdkDragEnter,
  CdkDragMove,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Car } from 'src/app/shared/car.model';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  @ViewChild('dropListContainer') dropListContainer?: ElementRef;

  dropListReceiverElement?: HTMLElement;
  dragDropInfo?: {
    dragIndex: number;
    dropIndex: number;
  };

  add() {
    this.files.push(this.files.length + 1);
  }

  shuffle() {
    this.files.sort(function () {
      return 0.5 - Math.random();
    });
  }

  dragEntered(event: CdkDragEnter<number>) {
    const drag = event.item;
    const dropList = event.container;
    const dragIndex = drag.data;
    const dropIndex = dropList.data;

    this.dragDropInfo = { dragIndex, dropIndex };
    console.log('dragEntered', { dragIndex, dropIndex });

    const phContainer = dropList.element.nativeElement;
    const phElement = phContainer.querySelector('.cdk-drag-placeholder');

    if (phElement) {
      phContainer.removeChild(phElement);
      phContainer.parentElement?.insertBefore(phElement, phContainer);

      moveItemInArray(this.files, dragIndex, dropIndex);
      moveItemInArray(this.filesToDisplay, dragIndex, dropIndex);
    }
  }

  dragMoved(event: CdkDragMove<number>) {
    if (!this.dropListContainer || !this.dragDropInfo) return;

    const placeholderElement =
      this.dropListContainer.nativeElement.querySelector(
        '.cdk-drag-placeholder'
      );

    const receiverElement =
      this.dragDropInfo.dragIndex > this.dragDropInfo.dropIndex
        ? placeholderElement?.nextElementSibling
        : placeholderElement?.previousElementSibling;

    if (!receiverElement) {
      return;
    }

    receiverElement.style.display = 'none';
    this.dropListReceiverElement = receiverElement;
  }

  dragDropped(event: CdkDragDrop<number>) {
    if (!this.dropListReceiverElement) {
      return;
    }

    this.dropListReceiverElement.style.removeProperty('display');
    this.dropListReceiverElement = undefined;
    this.dragDropInfo = undefined;
  }

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
    private builder: FormlyFormBuilder,
    private formlyJsonschema: FormlyJsonschema
  ) { }

  ngOnInit() {
    console.log("ejecutando on init");
    this.ftService.getFormTemplates().subscribe(data => {
      if (data && data.length > 0) {
        this.formTemplates = data;

        this.loadFormTemplate("owner");
        // this.loadFormTemplate("documentation");
        this.loadFormTemplate("equipment");
        this.loadFormTemplate("indoorConditions");
        this.loadFormTemplate("electricController");
        // this.loadFormTemplate("bodyworkEvaluation");
        // this.loadFormTemplate("mechanicRevision");
      }

    });
    this.isCompleted = false;
  }

  loadFormTemplate(name: string) {
    let template = this.formTemplates.find(pr => pr.name == name)!;

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
        // this.fieldsIndoorConditions = [this.formlyJsonschema.toFieldConfig(JSON.parse(template.definition))];
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
        // Swal.fire({ text: JSON.stringify(this.carForm.value) + "----" + JSON.stringify(this.modelOwner)});
      }
    })
  }

  onFormSubmit(): void {
    this.isCompleted = true;
    var formData = new FormData();
    const car = new Car();

    car.brand = this.carForm.value.brand!;
    car.model = this.carForm.value.model!;
    car.year = +this.carForm.value.year!;
    car.kilometers = +this.carForm.value.kilometers!;
    car.price = +this.carForm.value.price!;
    car.transmission = this.carForm.value.transmission!;

    car.owner = JSON.stringify(this.modelOwner);
    car.documents = JSON.stringify(this.modelDocumentation);
    car.equipments = JSON.stringify(this.modelEquipment);
    car.indoorConditions = JSON.stringify(this.modelIndoorConditions);
    car.electricController = JSON.stringify(this.modelElectricController);
    car.mechanicRevision = JSON.stringify(this.modelMechanicRevision);
    car.bodyworkEvaluation = JSON.stringify(this.modelBodyworkEvaluation);

    formData.append("car", JSON.stringify(car));

    this.files.forEach((file: string | Blob) => {
      formData.append("files", file);
    });

    this.api.createCarMultipleImages(formData)
      .subscribe({
        next: (v) => {
          this.files = [];
          formData = new FormData();
          this.carForm.reset();
          this.formOwner.reset();
          this.formDocumentation.reset();
          this.formEquipment.reset();
          this.formIndoorConditions.reset();
          this.formElectricController.reset();
          this.formMechanicRevision.reset();
          this.formBodyworkEvaluation.reset();
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
    const reader = new FileReader();

    if (result != null) {
      console.log("(file) result: ", result);

      if (result.length != null) {
        console.log("uno");
        for (let index = 0; index < result.length; index++) {
          const element = result[index];
          reader.readAsDataURL(element);
          reader.onload = () => {
            const imageSrc = reader.result as string;
            this.filesToDisplay.push(imageSrc);
          };
          this.files.push(element)
        }
      } else {
        console.log("dos");
        const files = event.target.files;
        for (let index = 0; index < files.length; index++) {
          const element = files[index];
          this.files.push(element)
        }
      }

    }
  }

  deleteAttachment(index: any) {
    this.files.splice(index, 1);
    this.filesToDisplay.splice(index, 1);
  }

  cancelEdit() {
    this.router.navigate(['/']);
  }

}
