import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Employee } from '../models/employee.model';
import { EmployeesService } from './employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  pageSizeOptions = ["5", "10", "15", "20"];
  sortFieldOptions = [
    { value: "employeeId", label: 'ID' }, 
    { value: "employeeFirstName", label: 'First Name'},
    { value: "employeeLastName", label: 'Last Name'},
    { value: "employeeEmail", label: 'Email'},
    { value: "employeeDepartment", label: 'Department ID'}
  ];
  sortDirectionOptions = [{ value: "ASC", label: "Ascending" }, { value: "DESC", label: "Descending" }]

  pageNo = 1;
  pageSize = "10";
  totalElements = 0;
  sortField = 'employeeId';
  sortDirection = 'ASC';
  searchQuery = '';
  loading = false;

  employees: Employee[] = [];

  dialogRef!: NbDialogRef<any>;
  currEmployeeId!: number;

  unsubsribe$ = new Subject<void>();
  
  constructor(private employeesService: EmployeesService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private translateService: TranslateService) { }

  ngOnInit(): void {
    this.updateEmployees();
  }

  updateEmployees(): void {
    this.loading = true;
    this.employeesService.getEmployees(this.pageNo, this.stringToInt(this.pageSize), this.sortField, this.sortDirection, this.searchQuery)
    .pipe(takeUntil(this.unsubsribe$))
    .subscribe((employees: HttpResponse<Employee[]>) => {
      this.employees = employees.body || [];
      this.totalElements = this.stringToInt(employees.headers.get('X-Total-Count') || "0");
      this.loading = false;
    }, () => this.loading = false);
  }

  updatePage(pageNo: number): void {
    this.pageNo = pageNo;
    this.updateEmployees();
  }

  stringToInt(st: string): number {
    return parseInt(st);
  }

  openAddDialog(dialog: TemplateRef<any>): void {
    this.dialogRef = this.dialogService.open(dialog);
  }

  openEditDialog(dialog: TemplateRef<any>, employeeId: number): void {
    this.currEmployeeId = employeeId;
    this.dialogRef = this.dialogService.open(dialog);
  }


  addEmployeeAndUpdate(employee: Employee): void {
    this.employeesService.addEmployee(employee)
    .pipe(takeUntil(this.unsubsribe$))
    .subscribe(() => {
      this.toastrService.success(this.translateService.instant('employees.employeeAddSuccess'), this.translateService.instant('general.success'));
      this.dialogRef.close();
      this.updateEmployees();
    }, (error) => {
      if(error.error.messages) {
        for(let message of error.error.messages)
          this.toastrService.danger(message, this.translateService.instant('general.error'));
      }
    });
  }

  editEmployeeAndUpdate(employee: Employee): void {
    this.employeesService.editEmployee({ employeeId: this.currEmployeeId, ...employee })
    .pipe(takeUntil(this.unsubsribe$))
    .subscribe(() => {
      this.toastrService.success(this.translateService.instant('employees.employeeEditSuccess'), this.translateService.instant('general.success'));
      this.dialogRef.close();
      this.updateEmployees();
    }, (error) => {
      if(error.error.messages) {
        for(let message of error.error.messages)
          this.toastrService.danger(message, this.translateService.instant('general.error'));
      }
    });
  }

  deleteEmployeeAndUpdate(employeeId: number): void {
    if(!confirm(this.translateService.instant('employees.employeeDeleteConfirm')))
      return;
    this.employeesService.deleteEmployee(employeeId)
    .pipe(takeUntil(this.unsubsribe$))
    .subscribe(() => {
      this.toastrService.success(this.translateService.instant('employees.employeeDeleteSuccess'), this.translateService.instant('general.success'));
      this.updateEmployees();
    }, (error) => {
      if(error.error.messages) {
        for(let message of error.error.messages)
          this.toastrService.danger(message, this.translateService.instant('general.error'));
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubsribe$.next();
    this.unsubsribe$.unsubscribe();
  }
}
