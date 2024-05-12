import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { searchUserById } from '../../../../core/store/users.action';

@Component({
  selector: 'app-users-details',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './users-details.component.html',
  styleUrl: './users-details.component.scss'
})
export class UsersDetailsComponent implements OnInit {
  filteredUser$ !: Observable<any>
  user!: User
  id: number = 0
  _unSubscribeAll = new Subject();

  constructor(private store:Store, private route: ActivatedRoute) {
    this.route.params.subscribe(param => {
      this.id = +param["id"]
    })
  }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    this.store.dispatch(searchUserById({ id:this.id }));
    this.filteredUser$ = this.store.select((state: any) => {
      return state.user.user?.data
    });
    this.filteredUser$.subscribe(((res:any)=>{
      this.user = res;
    }))
  }

  onNavigateBack() {
    history.back()
  }
}

