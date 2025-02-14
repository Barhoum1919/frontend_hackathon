import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  isLoading=true;
  loginform!:FormGroup;
  constructor(private readonly fb:FormBuilder,
    private userservice:UserService,
    private router:Router


  ){}
  ngOnInit(): void { 
    this.loginform=this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
      });

    setTimeout(() => {
      this.isLoading = false; 
    }, 2000);
  }

  onSubmit(){
    if(this.loginform.valid){
      this.userservice.login(this.loginform.value).subscribe({
        next:(res:any)=>{
          if (res && res.token){
            this.router.navigate(['/dashboard']);
          }
        }
      })
    }
  }
}
