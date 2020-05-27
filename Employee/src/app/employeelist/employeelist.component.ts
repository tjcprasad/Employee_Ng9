import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource}  from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent {
  
  displayedColumns: string[] = ['id', 'userId', 'firstName', 'lastName', 'jobTitleName' , 'region', 'phoneNumber', 'emailAddress', "delete", "update"];
  public dataSource : MatTableDataSource<any>;
  public empData;
  today:Date = new Date();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http:HttpClient, private employeeDataService:EmployeeService, private router:Router){     
   
  }

  ngOnInit() {
    this.getEmployees();    
  }

  private getEmployees() {    
    /*this.http.get("http://localhost:3000/employees").subscribe((data)=> {      
      this.dataSource = new MatTableDataSource(Object.values(data));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.warn(this.dataSource);
    })*/
    this.employeeDataService.getEmployeesData().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(Object.values(data));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addEmployee(data) {
    this.employeeDataService.createEmployeeData(data).subscribe((result)=>{
       console.warn("result", result);
       if(result != null) {
          this.getEmployees();
       }      
    })
  }

  editEmployee(id) {
    /*this.employeeDataService.getEmployeeData(id).subscribe((data)=>{
      this.empData = data;
      console.warn(this.empData);
    });*/
    this.router.navigate(['/emp/'+id]);
  }

  updateEmployee(id, data) {
    this.employeeDataService.updateEmployeeData(id, data).subscribe((result)=>{
       console.warn("result", result);
       if(result != null) {
          this.getEmployees();
       }      
    })
  }

  removeEmployee(id) {
    console.warn(id);
    this.employeeDataService.deleteEmployeeData(id).subscribe((result)=>{
       console.warn("result", result);
       if(result != null) {
          this.getEmployees();
       }      
    })
  }
}