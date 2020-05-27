import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
@Component({
  selector: 'app-updateemployee',
  templateUrl: './updateemployee.component.html',
  styleUrls: ['./updateemployee.component.css']
})
export class UpdateemployeeComponent implements OnInit {
  id: string;
  employee: Employee;
  constructor(private arouter: ActivatedRoute, private employeeService:EmployeeService, private router:Router) {

  }

  setDefaults() {
    this.employee = {
      userId: "test123",
      firstName: "Sachin",
      lastName: "Tendulkar",
      email: "sachin@gmail.com",
      region: "male",
      jobTitleName: "Dev",
      phoneNumber: "9838292334",
    };
  }

  ngOnInit(): void {
     console.warn(this.arouter.snapshot.params.id);
     this.employeeService.getEmployeeData(this.arouter.snapshot.params.id).subscribe((result)=>{
        console.warn(result);
        this.employee = {
          userId: result["userId"],
          firstName: result["firstName"],
          lastName: result["lastName"],
          email: result["emailAddress"],
          region: result["region"],
          jobTitleName: result["jobTitleName"],
          phoneNumber: result["phoneNumber"],
        };
     })
  }

  updateEmployee(data) {
    this.id=this.arouter.snapshot.params.id;
    this.employeeService.updateEmployeeData(this.id, data).subscribe((result)=>{
       console.warn("result", result);
       if(result != null) {          
          //this.getEmployees();
          this.router.navigate(['']);
       }      
    })
  }
}

export class Employee {
  userId: string;
  firstName: string;
  lastName: string;  
  jobTitleName: string;
  region: string;
  phoneNumber: string;
  email: string;
}
