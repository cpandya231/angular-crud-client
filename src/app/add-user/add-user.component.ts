import { ApiService } from "./../api.service";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormArray
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"]
})
export class AddUserComponent implements OnInit {
  userFormGroup: FormGroup;
  skill: FormGroup;

  validationErrors = {
    firstName: {
      required: "Please enter first name.",
      minlength: "First name should be atleast 2 to 10 char long"
    },
    email: {
      required: "Please enter email.",
      email: "Invalid email",
      invalidEmailDomain: "Only gmail domains are allowed"
    },
    phone: {
      required: "Please enter phone.",
      minlength: "Invalid phone number",
      maxlength: "Invalid phone number"
    }


  };
  formErrors = {


  };
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
      email: [
        "",
        [
          Validators.email,
          Validators.required,
          emailDomainValidation("gmail.com")
        ]
      ],
      phone: [
        "",
        [
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.required
        ]
      ],
      age: [""],
      skill: this.fb.array([this.addSkillFormGroup()])
    });

    this.userFormGroup.valueChanges.subscribe(data => {
      this.validateForm();
    });


  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillname: ["", Validators.required],
      experience: ["", Validators.required],
      proficiency: ["", Validators.required]
    });
  }


  loadData() {
    this.validateForm(this.userFormGroup);

  }
  validateForm(group: FormGroup = this.userFormGroup): void {
    console.log(group);
    Object.keys(group.controls).forEach(key => {
      this.formErrors[key] = "";
      const abstractControl = group.get(key);
      this.validateControlOrForm(abstractControl, key);

      if (abstractControl instanceof FormGroup) {
        this.validateForm(abstractControl);
      }

    });
  }

  private validateControlOrForm(abstractControl: AbstractControl, key: string) {
    if (abstractControl && !abstractControl.valid && abstractControl.touched) {

      const messages = this.validationErrors[key];
      for (const error in abstractControl.errors) {
        if (error) {

          this.formErrors[key] += messages[error] + " ";
        }
      }
    }
  }

  onSubmit(): void {
    this.apiService.createUser(this.userFormGroup.value).subscribe(data => {
      console.log(`Response received ${data}`);
      this.router.navigate(["listusers"]);
    });
  }

  addSkill():void{

    (<FormArray>this.userFormGroup.get('skill')).push(this.addSkillFormGroup());

  }
  removeSkills(skillIndex){
    (<FormArray>this.userFormGroup.get('skill')).removeAt(skillIndex);
  }
}
function emailDomainValidation(domainName: string) {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const email: string = control.value;
    const domain = email.substring(email.lastIndexOf("@") + 1);
    if (email === "" || domain.toLowerCase() === domainName.toLowerCase()) {
      return null;
    } else {
      return { invalidEmailDomain: true };
    }
  };
}
