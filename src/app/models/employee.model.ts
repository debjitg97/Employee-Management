import { Department } from "./department.model";

export interface Employee {
    employeeId?: number;
    employeeFirstName: string;
    employeeLastName: string;
    employeeEmail: string;
    employeeDepartment: Department;
}