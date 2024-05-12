import { Component, numberAttribute, OnDestroy, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { UserService } from '../../pages/users/services/user.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,MatMenuModule,MatIconModule, ReactiveFormsModule,
    MatButtonModule,CommonModule,RouterLink,MatFormFieldModule, 
    MatInputModule, MatSelectModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit,OnDestroy {
  _unSubscribeAll = new Subject();
  search = new FormControl(null)
  userName!:any;

  constructor(private router:Router,private userService:UserService) {
  }

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(1000),
    ).subscribe(res=>{
        this.userService.searchId.next(+res!);
    })
  }

  onInputChange(e:any){
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  ngOnDestroy() {
    this._unSubscribeAll.next(null);
    this._unSubscribeAll.complete();
  }
}
