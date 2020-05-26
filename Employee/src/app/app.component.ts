import { Component, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource}  from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { EmployeeService } from './employee.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedColumns: string[] = ['id', 'userId', 'firstName', 'lastName', 'jobTitleName' , 'region', 'phoneNumber', 'emailAddress'];
  public dataSource : MatTableDataSource<any>;
  today:Date = new Date();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http:HttpClient, private employeeData:EmployeeService){     
   
  }

  ngOnInit() {
    this.getEmployees();    
  }

  /*onSubmit(data) {
    this.http.post("http://localhost:3000/employees", data).subscribe((result)=> {
      console.warn(result);
    })
    console.warn(data);
  }*/

  private getEmployees() {    
    /*this.http.get("http://localhost:3000/employees").subscribe((data)=> {      
      this.dataSource = new MatTableDataSource(Object.values(data));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.warn(this.dataSource);
    })*/
    this.employeeData.getEmployeeData().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(Object.values(data));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addEmployee(data) {
    this.employeeData.createEmployeeData(data).subscribe((result)=>{
       console.warn("result", result);
       if(result != null) {
          this.getEmployees();
       }      
    })
  }

  updateEmployee(data) {
    this.employeeData.updateEmployeeData(data).subscribe((result)=>{
       console.warn("result", result);
       if(result != null) {
          this.getEmployees();
       }      
    })
  }

  removeEmployee(data) {
    this.employeeData.deleteEmployeeData(data).subscribe((result)=>{
       console.warn("result", result);
       if(result != null) {
          this.getEmployees();
       }      
    })
  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }
}