import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

import {Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { UrlSerializer } from '@angular/router';


export interface User {
  id: string;
  login: string;
  password: string;
}

const ELEMENT_DATA: User[] = [];

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
@Injectable()
export class AboutComponent implements OnInit {

  //apiUrl = "http://localhost:5550/api";
  apiUrl = "http://localhost:4200/api";
  displayedColumns: string[] = ['id', 'login', 'password', 'delete'];
  dataSource = ELEMENT_DATA;

  loadUsers() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+localStorage.getItem("token")
    })
    return this.http.get<User[]>(this.apiUrl+"/rest/user/list", {headers: headers}).subscribe(data => {
      this.dataSource = data;
    });
  }

  addUser(login:String, password:String) {
    var data:Object = {
      login: login,
      password: password
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+localStorage.getItem("token")
    })
    return this.http.post<User>(this.apiUrl+"/rest/user/add", data, {headers: headers}).subscribe(data => {
      this.loadUsers();
    });
  }

  deleteUser(login: String){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+localStorage.getItem("token")
    })
    return this.http.delete<User[]>(this.apiUrl+"/rest/user/"+login+"/delete", {headers: headers}).subscribe(data => {
      this.loadUsers();
    });
  }

  ngOnInit() {
    this.loadUsers()
  }

  constructor(private http: HttpClient,public dialog: MatDialog) { }

  id: string = "";
  login: string = "";
  password: string = "";

  save(user: User){
    console.log(user);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {id: this.id, login: this.login, password: this.password},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.addUser( result.login, result.password );
    });
  }

}



@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.form.html',
})
export class DialogOverviewExampleDialog {

  save(user: User){
    console.log(user);
  }

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
