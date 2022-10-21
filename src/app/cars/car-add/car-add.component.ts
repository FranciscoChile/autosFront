import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Navigation, Router } from '@angular/router';
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

  inEdition: Boolean = false;

  car!: Car;

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
  ) {
    let nav: Navigation = this.router.getCurrentNavigation()!;
    if (nav.extras && nav.extras.state && nav.extras.state['car']) {
      this.inEdition = true;
      this.car = nav.extras.state['car'] as Car;
      console.log("MODO EDICION: ", nav.extras.state['car']);
      // this.loadCar(car);
    }
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

  loadCar() {
    this.carForm.controls.brand.setValue(this.car.brand);
    this.carForm.controls.model.setValue(this.car.model);
    this.carForm.controls.year.setValue(this.car.year.toString());
    this.carForm.controls.kilometers.setValue(this.car.kilometers.toString());
    this.carForm.controls.price.setValue(this.car.price.toString());
    this.carForm.controls.transmission.setValue(this.car.transmission);

    this.modelOwner = this.loadDynamicForm(this.fieldsOwner, this.car.owner);
    this.modelDocumentation = this.loadDynamicForm(this.fieldsDocumentation, this.car.documents);
    this.modelEquipment = this.loadDynamicForm(this.fieldsEquipment, this.car.equipments);
    this.modelIndoorConditions = this.loadDynamicForm(this.fieldsIndoorConditions, this.car.indoorConditions);
    this.modelElectricController = this.loadDynamicForm(this.fieldsElectricController, this.car.electricController);
    this.modelBodyworkEvaluation = this.loadDynamicForm(this.fieldsBodyworkEvaluation, this.car.bodyworkEvaluation);
    this.modelMechanicRevision = this.loadDynamicForm(this.fieldsMechanicRevision, this.car.mechanicRevision);
  }

  loadDynamicForm(fields: FormlyFieldConfig[], formData: string) {
    // cargando datos seccion formulario dinamico
    var obj: Record<string, any> = {};

    fields.forEach(element => {
      let key: any = element.key;
      let cObj = JSON.parse(formData);
      if (cObj) {
        obj[key] = cObj[key];
      }
    });

    return obj;
  }

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
        this.loadFormTemplate("bodyworkEvaluation");
        this.loadFormTemplate("mechanicRevision");

        if (this.car) {
          this.loadCar();
        }

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
    this.router.navigate(['list']);
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
    const carLocal = new Car();

    carLocal.brand = this.carForm.value.brand!;
    carLocal.model = this.carForm.value.model!;
    carLocal.year = +this.carForm.value.year!;
    carLocal.kilometers = +this.carForm.value.kilometers!;
    carLocal.price = +this.carForm.value.price!;
    carLocal.transmission = this.carForm.value.transmission!;

    carLocal.owner = JSON.stringify(this.modelOwner);
    carLocal.documents = JSON.stringify(this.modelDocumentation);
    carLocal.equipments = JSON.stringify(this.modelEquipment);
    carLocal.indoorConditions = JSON.stringify(this.modelIndoorConditions);
    carLocal.electricController = JSON.stringify(this.modelElectricController);
    carLocal.mechanicRevision = JSON.stringify(this.modelMechanicRevision);
    carLocal.bodyworkEvaluation = JSON.stringify(this.modelBodyworkEvaluation);

    formData.append("car", JSON.stringify(carLocal));

    if (!this.inEdition) {
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
          this.router.navigate(['list'])
        },
        error: (e) => {
          throw new Error('Error en el ingreso de los datos (1)');
        },
        complete: () => {
          this.isCompleted = false;
          this._snackBar.open("Auto creado", "X", { duration: 5000 });
        }
      });

    } else {
      this.api.updateCarMultipleImages(formData, this.car.id)
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
          this.router.navigate(['list'])
        },
        error: (e) => {
          throw new Error('Error en el ingreso de los datos (2)');
        },
        complete: () => {
          this.isCompleted = false;
          this._snackBar.open("Auto actualizado", "X", { duration: 5000 });
        }
      });
    }


  }

  uploadFile(event: any) {
    const result = event;
    const reader = new FileReader();

    if (result != null) {


      if (result.length != null) {
        console.log("uno");
        console.log("(file) result: ", result);
        for (let index = 0; index < result.length; index++) {
          const element = result[index];
          reader.readAsDataURL(element);
          reader.onload = async () => {
            const imageSrc = reader.result as string;
            await this.filesToDisplay.push(imageSrc);
          };
          this.files.push(element)
        }
      } else {
        const files = event.target.files;
        console.log("dos");
        console.log("(file) result: ", files);
        for (let index = 0; index < files.length; index++) {
          const element = files[index];
          reader.readAsDataURL(element);
          reader.onload = async () => {
            const imageSrc = reader.result as string;
            await this.filesToDisplay.push(imageSrc);
          };
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
