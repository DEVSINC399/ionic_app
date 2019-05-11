import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UrlSerializer } from 'ionic-angular';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class User {
  username: string;
  password: string;
 
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
@Injectable()
export class AuthServiceProvider {

  currentUser: User;

  public login(credentials){
    if(credentials.email === null || credentials.password === null){
      return Observable.throw('Please insert credentials');
      }
        else{
          return Observable.create(observer =>{
        let access = (credentials.username === "username" && credentials.password === "password");
        this.currentUser = new User('saimon','1234');
        observer.next(access);
        observer.complete();
      });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  // constructor(public http: HttpClient) {
  //   console.log('Hello AuthServiceProvider Provider');
  // }

}
