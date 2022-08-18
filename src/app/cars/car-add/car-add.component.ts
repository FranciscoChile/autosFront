import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarsService } from '../services/cars.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';

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
    transmission: new FormControl('', Validators.required)
  });

  files: any  = [];  
  filesToDisplay: any  = [];
  isCompleted:boolean = true;

  constructor(
    private router: Router, 
    private api: CarsService, 
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.isCompleted=false;
  }

  onFormSubmit(): void {
    this.isCompleted=true;
    var formData = new FormData();
    formData.append("car", JSON.stringify(this.carForm.value));

    this.files.forEach((file: string | Blob) => {  
      formData.append("files",file);
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
        this.isCompleted=false;
        this._snackBar.open("Auto creado", "X", {duration: 5000});
      }
    });

  }

  uploadFile(event: any) {

    const result = event;
    
    if (result != null) {     

      if (result.length != null) {
        for (let index = 0; index < result.length ; index++) {
          const element = result[index];
          this.files.push(element)
        }  
      } else {
        const files = event.target.files;
        for (let index = 0; index < files.length ; index++) {
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
    this.router.navigate(['/selling']);
  }

  

  

}
