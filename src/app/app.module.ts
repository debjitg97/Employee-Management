import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbIconModule, NbSelectModule, NbSpinnerModule, NbDialogModule, NbInputModule, NbButtonModule, NbCardModule, NbToastrModule, NbGlobalPhysicalPosition } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DepartmentsComponent } from './departments/departments.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DepartmentAddEditComponent } from './departments/department-add-edit/department-add-edit.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeAddEditComponent } from './employees/employee-add-edit/employee-add-edit.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    DepartmentsComponent,
    DepartmentAddEditComponent,
    EmployeesComponent,
    EmployeeAddEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    HttpClientModule,
    NgbModule,
    NbIconModule,
    NbSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NbSpinnerModule,
    NbDialogModule.forRoot(),
    NbInputModule,
    NbButtonModule,
    NbCardModule,
    NbToastrModule.forRoot({ position: NbGlobalPhysicalPosition.BOTTOM_RIGHT }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
