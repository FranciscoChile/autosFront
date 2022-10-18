import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CarsRoutingModule } from './cars-routing.module';
import { UsersRoutingModule } from './users-routing.module';
import { ErrorRoutingModule } from './error-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './cars/home/home.component';
import { CarAddComponent } from './cars/car-add/car-add.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

import { CarSellingComponent } from './cars/car-selling/car-selling.component';
import { CarDetailComponent } from './cars/car-detail/car-detail.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DragDropDirective } from './shared/drag-drop.directive';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ServerErrorInterceptor } from './shared/server-error-interceptor';
import { GlobalErrorHandler } from './shared/global-error-handler';

import { NgImageSliderModule } from 'ng-image-slider';
import { SignupComponent } from './users/signup/signup.component';
import { LoginComponent } from './users/login/login.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { Home2Component } from './cars/home2/home2/home2.component';
import { FilterCarSellingPipe } from './cars/car-selling/filter-car-selling.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CarListComponent } from './cars/car-list/car-list.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarAddComponent,
    CarSellingComponent,
    CarDetailComponent,
    DragDropDirective,
    SignupComponent,
    LoginComponent,
    NotFoundComponent,
    Home2Component,
    FilterCarSellingPipe,
    CarListComponent
  ],
  imports: [
    BrowserModule,
    CarsRoutingModule,
    UsersRoutingModule,
    ErrorRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatFormFieldModule, MatProgressBarModule,
    MatSidenavModule, MatListModule,
    MatSlideToggleModule, MatGridListModule, MatExpansionModule,
    FormsModule, ReactiveFormsModule,
    Ng2SearchPipeModule, MatSnackBarModule, NgImageSliderModule,
    MatDatepickerModule, MatNativeDateModule, NgxPaginationModule,
    DragDropModule,
    FormlyModule.forRoot({
      extras: {
        lazyRender: true
      }
    }),
    FormlyBootstrapModule,
    DataTablesModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
