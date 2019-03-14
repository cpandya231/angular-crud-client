import { ApiService } from './../api.service';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"]
})
export class AddUserComponent implements OnInit {
  userFormGroup: FormGroup;
  constructor(private fb:FormBuilder,
    private apiService:ApiService,
    private router: Router) {}

  ngOnInit() {
    this.userFormGroup = this.fb.group({
      name: ['',Validators.required],
      firstName: [''],
      lastName: [''],
      age: ['']
    });
  }

  onSubmit(): void {
    this.apiService.createUser(this.userFormGroup.value).subscribe(
      data=>{
        console.log(`Response received ${data}`);
        this.router.navigate(['listusers']);
      }
    );
  }
}
