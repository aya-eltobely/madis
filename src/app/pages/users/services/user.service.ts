import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { Pagination } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `https://reqres.in/api/users` ;

  searchId = new  BehaviorSubject<number>(0)

  constructor(private http:HttpClient) { }

  getAllUsers(page:number,pageSize:number):Observable<Pagination>
  {
    return this.http.get<Pagination>(`${this.apiUrl}?page=${page}&per_page=${pageSize}`);
  }

  searchByUserId(id:number) :Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/${id}`)
  }
}
