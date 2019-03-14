import { EditUserComponent } from './edit-user/edit-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AppModule } from './app.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'/dashboard',component:AppModule,pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent},
  {path:'createUser',component:AddUserComponent},
  {path:'listusers',component:ListUserComponent},
  {path:'updateUser',component:EditUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
