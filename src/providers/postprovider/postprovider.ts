import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostProvider{

    server:string = 'http://aabroo.org/aabrooapp/aabrooapp.php';

    constructor(public http:Http){

    }

    postData(data){
        var type = "application/json; charset:utf-8";
        var headers = new Headers({ 'Content-Type': type });
        var options = new RequestOptions({ headers: headers });

        return this.http.post(this.server, JSON.stringify(data), options)
        .map(res => res.json());
    } 

}