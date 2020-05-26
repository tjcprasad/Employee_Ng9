import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url="http://localhost:3000/employees";
  constructor(private http:HttpClient) { }

  getEmployeeData() {
    return this.http.get(this.url);
    //console.warn(data)
  }

  createEmployeeData(data) {
    return this.http.post(this.url, data);
  }

  updateEmployeeData(data) {
    return this.http.put(this.url, data);
  }

  deleteEmployeeData(data) {
    return this.http.delete(this.url, data.id);
  }
}
