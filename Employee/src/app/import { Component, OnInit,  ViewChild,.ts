import { Component, OnInit,  ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'FormsDemo';
  displayedColumns: string[] = ['id', 'userId', 'firstName', 'lastName'];
  formData;
  public array: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  public dataSource: any; 
  public pageIndex = 0;
  public lowValue = 0;
  public highValue = 50;   
  public length = 100;
  public pageSizeOptions: number[] = [5, 10, 25, 100];

  pageEvent: PageEvent;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http:HttpClient){}

  ngOnInit() {
    this.getArray();    
  }

  private getArray() {
    this.http.get("http://localhost:3000/employees").subscribe((data)=> {
      //this.formData = data;       
       this.dataSource = new MatTableDataSource(<any>data);
       this.dataSource.paginator = this.paginator;
       this.array = data;
       this.totalSize = this.array.length;
       this.iterator();
    })
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  }

public getPaginatorData(event){
    console.log(event);
    if(event.pageIndex === this.pageIndex + 1){
       this.lowValue = this.lowValue + this.pageSize;
       this.highValue =  this.highValue + this.pageSize;
      }
   else if(event.pageIndex === this.pageIndex - 1){
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue =  this.highValue - this.pageSize;
     }   
      this.pageIndex = event.pageIndex;
}

  onSubmit(data) {
    console.warn(data);
  }

  ngAfterViewInit(): void {
    this.formData.sort = this.sort;
    this.formData.paginator = this.paginator;
    
  }
}
