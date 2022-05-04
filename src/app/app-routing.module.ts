import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentsComponent } from './departments/departments.component';
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
  { path: 'departments', component: DepartmentsComponent },
  { path: 'employees', component: EmployeesComponent},
  { path: '**', redirectTo: '/employees'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
