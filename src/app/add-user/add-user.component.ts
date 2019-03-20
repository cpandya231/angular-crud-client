import { ApiService } from "./../api.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"]
})
export class AddUserComponent implements OnInit {
  userFormGroup: FormGroup;

  validationErrors = {
    'firstName': {
      "required": "Please enter first name.",
      "minlength": "First name should be atleast 2 to 10 char long"
    }
  };
  formErrors={
    'firstName':''
  }
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userFormGroup = this.fb.group({
      firstName: [
        "",
        [Validators.required, Validators.minLength(2), Validators.maxLength(10)]
      ],
      lastName: [""],
      age: [""]
    });

    this.userFormGroup.valueChanges.subscribe(data=>{
      this.validateForm();
    })
  }



  loadData() {
    this.validateForm(this.userFormGroup);
    console.log(this.formErrors);
  }
  validateForm(group: FormGroup=this.userFormGroup): void {
    Object.keys(group.controls).forEach(key => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.validateForm(abstractControl);
      } else {
        this.formErrors[key]='';
        if(abstractControl && !abstractControl.valid){
          const messages= this.validationErrors[key];
          for(const error in abstractControl.errors){
            if(error){
              this.formErrors[key]+=messages[error]+' ';
            }
          }
        }
      }
    });
  }

  onSubmit(): void {
    this.apiService.createUser(this.userFormGroup.value).subscribe(data => {
      console.log(`Response received ${data}`);
      this.router.navigate(["listusers"]);
    });
  }
}
