import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  isLoading=true;
  registerform!:FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userservice:UserService
  ) { }
  ngOnInit(): void {
    this.registerform = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      company_name: ['', Validators.required],
      company_description: ['', Validators.required],
      preferences: this.formBuilder.array([]),
      });
   
    setTimeout(() => {
      this.isLoading = false; 
    }, 3000);
    
  }

  get preferences() {
    return (this.registerform.get('preferences') as FormArray);
  }
  
  // Add preference to the form array
  // Method to handle checkbox selection
  onCheckboxChange(e: any): void {
    const preferences = this.preferences;
    if (e.target.checked) {
      preferences.push(this.formBuilder.control(e.target.value));
    } else {
      const index = preferences.controls.findIndex(x => x.value === e.target.value);
      if (index !== -1) {
        preferences.removeAt(index);
      }
    }
  }

  submit(){
    if(this.registerform.valid){
     this.userservice.signup(this.registerform.value).subscribe({
      next: (res:any) => {
        console.log(res);
        this.router.navigate(['/login']);
        },
     })
    }
  }
}
