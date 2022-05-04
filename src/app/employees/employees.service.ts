import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';

const BACKEND_URL = environment.backendUrl;

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  getEmployees(pageNo: number, pageSize: number, sortField: string, sortDirection: string, searchQuery: string): Observable<HttpResponse<Employee[]>> {
    return this.http.get<Employee[]>(`${BACKEND_URL}/v1/employees/${pageNo}/${pageSize}`, 
    { params: { sortField, sortDirection, searchQuery }, observe: 'response' });
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${BACKEND_URL}/v1/employees/add`, employee);
  }

  editEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${BACKEND_URL}/v1/employees/edit/${employee.employeeId}`, employee);
  }

  deleteEmployee(employeeId: number): Observable<string> {
    return this.http.delete<string>(`${BACKEND_URL}/v1/employees/delete/${employeeId}`, { responseType: 'text' as 'json' });
  }
}
