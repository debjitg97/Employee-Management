import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss']
})
export class EmployeeAddEditComponent implements OnChanges {
  @Input() employeeFirstName = '';
  @Input() employeeLastName = '';
  @Input() employeeEmail = '';
  @Input() departmentName = '';
  @Input() addOrEdit: 'add' | 'edit' = 'add';

  @Output() add: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Output() edit: EventEmitter<Employee> = new EventEmitter<Employee>();

  employeeForm = new FormGroup({
    employeeFirstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    employeeLastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    employeeEmail: new FormControl('', [Validators.required, Validators.email]),
    departmentName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)])
  });

  constructor() { }

  ngOnChanges(): void {
    this.employeeForm.patchValue({
      employeeFirstName: this.employeeFirstName,
      employeeLastName: this.employeeLastName,
      employeeEmail: this.employeeEmail,
      departmentName: this.departmentName
    });
  }

  addEmployee(): void {
    this.add.emit({
      employeeFirstName: this.employeeForm.controls.employeeFirstName.value,
      employeeLastName: this.employeeForm.controls.employeeLastName.value,
      employeeEmail: this.employeeForm.controls.employeeEmail.value,
      employeeDepartment: {
        departmentName: this.employeeForm.controls.departmentName.value
      }
    });
  }

  editEmployee(): void {
    this.edit.emit({
      employeeFirstName: this.employeeForm.controls.employeeFirstName.value,
      employeeLastName: this.employeeForm.controls.employeeLastName.value,
      employeeEmail: this.employeeForm.controls.employeeEmail.value,
      employeeDepartment: {
        departmentName: this.employeeForm.controls.departmentName.value
      }
    });
  }
}
