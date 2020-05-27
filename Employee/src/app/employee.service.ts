import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url="http://localhost:3000/employees";
  constructor(private http:HttpClient) { }

  getEmployeesData() {
    return this.http.get(this.url);
    //console.warn(data)
  }

  getEmployeeData(id) {
    return this.http.get(`${this.url}/${id}`);
    //console.warn(data)
  }

  createEmployeeData(data) {
    return this.http.post(this.url, data);
  }

  updateEmployeeData(id, data) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  deleteEmployeeData(id) {
    //return this.http.delete('${this.url}/${id}');
    return this.http.delete(`${this.url}/${id}`);
  }
}
