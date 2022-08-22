import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAddComponent } from './cars/car-add/car-add.component';
import { CarDetailComponent } from './cars/car-detail/car-detail.component';
import { CarSellingComponent } from './cars/car-selling/car-selling.component';
import { HomeComponent } from './cars/home/home.component';

const routes: Routes = [
  {
    path: 'selling',
    component: CarSellingComponent
  },
  {
    path: 'add',
    component: CarAddComponent
  },
  {
    path: 'detail/:id',
    component: CarDetailComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  { 
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule { }
