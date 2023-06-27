import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public signinForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private http : HttpClient, private router: Router){}
  ngOnInit(): void {
      this.signinForm = this.formBuilder.group({
        email:'',
        password:'',
        confirmpassword:'',
      })
  }

  signIn(){

    const email = this.signinForm.get('email')?.value;
    const password = this.signinForm.get('password')?.value;
    const confirmPassword = this.signinForm.get('confirmpassword')?.value;

    if (password !== confirmPassword) {
      alert('Password and Confirm Password do not match!');
      return; // Exit the signIn method
    }
    else if(password.length<6){
      alert('Password length must be at least 6 characters long');
    }
    else{
    // Perform the sign-in logic here
    // For example, make an HTTP request to authenticate the user
    this.http.post('http://localhost:3000/api/products/signin', { email, password }).subscribe(
      (response) => {
        // Successful sign-in
        alert('SignIn successfull !');
        this.signinForm.reset();
        this.router.navigate(['login']);
        // Perform any necessary actions, such as storing user data in local storage or navigating to a different route
      },
      (error) => {
        // Error occurred during sign-in
        console.error('Sign-in error:', error);
        // Handle the error, e.g., display an error message to the user
      }
    );
    }
  }

}
