import { User } from './../model/user.model';
import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from './../api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userFormGroup: FormGroup;
  @Input()
  user:User;
  constructor(private fb:FormBuilder,
    private apiService:ApiService,
    private router: Router) {}

  ngOnInit() {
    let userId = window.localStorage.getItem("editUserId");

    this.userFormGroup = this.fb.group({
      id:['',Validators.required],
      firstName: [''],
      lastName: [''],
      age: [''],
      salary:['']
    });
    if(userId){
      this.apiService.getUserById(userId).subscribe(user=>{
        console.log(`Response:${user.lastName}`)
        this.userFormGroup.setValue(user);
      });
    }
  }

  onSubmit(): void {
    this.apiService.updateUser(this.userFormGroup.value).subscribe(
      data=>{
        console.log(`Response received ${data}`);
        this.router.navigate(['listusers']);
      }
    );
  }


}
