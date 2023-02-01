import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {Router} from "@angular/router";

export interface Token{
  token: string;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent{

  //apiUrl = "http://localhost:5550/api";
  apiUrl = "http://localhost:4200/api";

  loginInput = "";
  passwordInput = "";
  loginError = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  loginRequest() {
    var data:Object = {
      login: this.loginInput,
      password: this.passwordInput
    }
    this.http.post<Token>(this.apiUrl+"/rest/authenticate", data).subscribe(
      result => {
        this.loginError = true;
        localStorage.setItem("token",  result.token );
        this.router.navigate(['/about'])
      },
      error => {
        this.loginError = true;
      }
    );
  }

  login(){
    this.loginRequest();
  }

}
