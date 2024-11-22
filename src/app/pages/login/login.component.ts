import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private router= inject(Router)
userForm :FormGroup =new FormGroup({
  username: new FormControl('',{
    validators:[Validators.required]
  }),
  password: new FormControl('')
})

onLogin(){
  const formValue=this.userForm.value;
  if(formValue.username === 'admin' && formValue.password === '12345')
  {
    this.router.navigateByUrl('dashboard')
  }
  else
  {
    window.alert('Wrong ceredentials')
  }
}
}
