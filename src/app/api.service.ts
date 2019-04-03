import { User } from './model/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json' ,
      'Content-Type': 'application/json'
      })
  };

  private baseUrlOld = 'http://localhost:8081/user/';
  private baseUrl = 'http://localhost:3000/users/';
  constructor(private http: HttpClient) { }


  createUser(user: User): Observable<User> {

    return this.http.post<User>(this.baseUrl, user, this.httpOptions).pipe(
      tap((responseUser: User) => console.log(`added hero w/ id=${responseUser.id}`))
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl , this.httpOptions);

  }

  getUserById(userId): Observable<User> {

    return this.http.get<User>(this.baseUrl + '' + userId, this.httpOptions);
  }

  deleteUser(userId): Observable<HttpResponse<String>> {
      return this.http.delete<HttpResponse<String>>(this.baseUrl + '' + userId, this.httpOptions);

  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.baseUrl + ''+ user.id, this.httpOptions);
  }


}
