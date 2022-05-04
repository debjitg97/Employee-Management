import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogRef, NbDialogService, NbSelectComponent, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Department } from '../models/department.model';
import { DepartmentsService } from './departments.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit, OnDestroy {
  pageSizeOptions = ["5", "10", "15", "20"];
  sortFieldOptions = [{ value: "departmentId", label: 'ID' }, { value: "departmentName", label: 'Name'}];
  sortDirectionOptions = [{ value: "ASC", label: "Ascending" }, { value: "DESC", label: "Descending" }]

  pageNo = 1;
  pageSize = "10";
  totalElements = 0;
  sortField = 'departmentId';
  sortDirection = 'ASC';
  searchQuery = '';
  loading = false;

  departments: Department[] = [];

  dialogRef!: NbDialogRef<any>;
  currDepartmentId!: number;

  unsubsribe$ = new Subject<void>();

  constructor(private departmentsService: DepartmentsService, 
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private translateService: TranslateService) { }

  ngOnInit(): void {
    this.updateDepartments();
  }

  updatePage(pageNo: number): void {
    this.pageNo = pageNo;
    this.updateDepartments();
  }

  updateDepartments(): void {
    this.loading = true;
    this.departmentsService.getDepartments(this.pageNo, this.stringToInt(this.pageSize), this.sortField, this.sortDirection, this.searchQuery)
    .pipe(takeUntil(this.unsubsribe$))
    .subscribe((departments: HttpResponse<Department[]>) => {
      this.departments = departments.body || [];
      this.totalElements = this.stringToInt(departments.headers.get('X-Total-Count') || "0");
      this.loading = false;
    }, () => this.loading = false);
  }

  stringToInt(st: string): number {
    return parseInt(st);
  }

  openAddDialog(dialog: TemplateRef<any>): void {
    this.dialogRef = this.dialogService.open(dialog);
  }

  openEditDialog(dialog: TemplateRef<any>, departmentId: number): void {
    this.currDepartmentId = departmentId;
    this.dialogRef = this.dialogService.open(dialog);
  }

  addDepartmentAndUpdate(departmentName: string): void {
    this.departmentsService.addDepartment({ departmentName })
    .pipe(takeUntil(this.unsubsribe$))
    .subscribe(() => {
      this.toastrService.success(this.translateService.instant('departments.departmentAddSuccess'), this.translateService.instant('general.success'));
      this.dialogRef.close();
      this.updateDepartments();
    }, (error) => {
      if(error.error.messages) {
        for(let message of error.error.messages)
          this.toastrService.danger(message, this.translateService.instant('general.error'));
      }
    });
  }

  editDepartmentAndUpdate(departmentName: string): void {
    this.departmentsService.editDepartment({ departmentId: this.currDepartmentId, departmentName })
    .pipe(takeUntil(this.unsubsribe$))
    .subscribe(() => {
      this.toastrService.success(this.translateService.instant('departments.departmentEditSuccess'), this.translateService.instant('general.success'));
      this.dialogRef.close();
      this.updateDepartments();
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
