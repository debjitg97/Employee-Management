import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-department-add-edit',
  templateUrl: './department-add-edit.component.html',
  styleUrls: ['./department-add-edit.component.scss']
})
export class DepartmentAddEditComponent implements OnChanges {
  @Input() departmentName = '';
  @Input() addOrEdit: 'add' | 'edit' = 'add';

  @Output() add: EventEmitter<string> = new EventEmitter<string>();
  @Output() edit: EventEmitter<string> = new EventEmitter<string>();
  
  departmentForm = new FormGroup({
    departmentName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)])
  });

  constructor() { }

  ngOnChanges(): void {
    this.departmentForm.patchValue({ departmentName: this.departmentName });
  }

  addDepartment(): void {
    this.add.emit(this.departmentForm.controls.departmentName.value);
  }

  editDepartment(): void {
    this.edit.emit(this.departmentForm.controls.departmentName.value);
  }
}
