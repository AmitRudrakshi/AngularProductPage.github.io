import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private http:HttpClient,
    private router: Router,
    public apiService: ApiService,
    ){}

  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        email:"",
        password:"",
      });
  }

  login(){

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    if(password.length<6){
      alert('Log-in error ! Please try again.');
    }
    else{
    // make an HTTP request to authenticate the user
    this.http.post('http://localhost:3000/api/products/login', { email, password }).subscribe(
      (response) => {
        // Successful log-in
        alert('LogIn successfull !');
        this.apiService.currentUserToken = Object.values(response)[0].toString();
        this.loginForm.reset();
      },
      (error) => {
        // Error occurred during sign-in
        console.error('Log-in error:', error);
        alert('Log-in error ! Please try again.');
      }
    );
    }
  }
}
