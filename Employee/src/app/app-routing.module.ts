import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { EmployeelistComponent }  from './employeelist/employeelist.component';
import { UpdateemployeeComponent } from './updateemployee/updateemployee.component';

const routes: Routes = [  
    {path:  '', component: EmployeelistComponent},  
    {path:  'emp/:id', component: UpdateemployeeComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
