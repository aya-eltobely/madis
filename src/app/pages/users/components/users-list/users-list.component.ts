import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CommonModule, } from '@angular/common';
import { Pagination } from '../../models/pagination';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { user } from '../../../../core/store/user.model';
import {  loadUser, searchUserById } from '../../../../core/store/users.action';
import {MatTableModule} from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { ScaleOutDirective } from '../../../../shared/directives/scale-out.directive';


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatPaginatorModule,MatTableModule,ScaleOutDirective],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  providers:[
    ScaleOutDirective
  ]
})
export class UsersListComponent implements OnInit {

  users$: Observable<user[]> = new Observable<user[]>();
  filteredUser$ !: Observable<any>

  isFiltered:boolean = false;
  page:number = 0 
  pageSize : number = 6


  data = signal<Pagination>({
    page: 1,
    per_page: 6,
    total: 0,
    total_pages: 0,
    data: []
  });


  filteredUser:User = {
    id:0,
    email:'',
    first_name:'',
    last_name:'',
    avatar:'',
  }

  constructor(private store: Store, private router: Router,private userService:UserService) {
    this.userService.searchId.subscribe((res:any)=>{      
      if(res !== 0){
        this.isFiltered = true
        this.getUsersList()
        this.store.dispatch(searchUserById({ id:res }));
        this.getFilterUser()
        // this.getUserById(res)
      }else{        
        this.isFiltered = false
      }
    })
  }


  ngOnInit() {
    this.store.dispatch(loadUser({ page: this.page, pageSize: this.pageSize }))
    this.users$ = this.store.select((state: any) => {
      return state.user?.list;
    });
    this.getUsersList(); 
  }

  getFilterUser(){
    this.filteredUser$ = this.store.select((state: any) => {
      return state.user.user?.data
    });

    this.filteredUser$.subscribe(((res:any)=>{
      this.isFiltered= true
      this.filteredUser = res
    }))
  }

  getUsersList() {
    this.users$.subscribe((res:any) => {
      this.isFiltered = false
      this.data.set(res);
    });
  }

  onNavigate(id: number) {
    this.router.navigate([`/user/${id}`])
  }

  onPageChange(event: PageEvent): void {    
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.store.dispatch(loadUser({page: this.page , pageSize: this.pageSize}));
  }
  
}
