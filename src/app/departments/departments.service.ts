import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../models/department.model';

const BACKEND_URL = environment.backendUrl;

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(private http: HttpClient) { }

  getDepartments(pageNo: number, pageSize: number, sortField: string, sortDirection: string, searchQuery: string): Observable<HttpResponse<Department[]>> {
    return this.http.get<Department[]>(`${BACKEND_URL}/v1/departments/${pageNo}/${pageSize}`, 
    { params: { sortField, sortDirection, searchQuery }, observe: 'response' });
  }

  addDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(`${BACKEND_URL}/v1/departments/add`, department);
  }

  editDepartment(department: Department): Observable<Department> {
    return this.http.put<Department>(`${BACKEND_URL}/v1/departments/edit/${department.departmentId}`, department);
  }
}
