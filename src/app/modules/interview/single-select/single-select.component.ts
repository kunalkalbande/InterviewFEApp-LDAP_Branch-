import { InterviewService } from './../../../shared/services/interview.service';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { DirectoryUsers } from 'src/app/shared/models/directory-users';

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss']
})
export class SingleSelectComponent implements OnInit, AfterViewInit, OnDestroy {
  // protected banks: Bank[] = BANKS;
  directoryUsers: DirectoryUsers[];
  public userCtrl: FormControl = new FormControl();
  public userFilterCtrl: FormControl = new FormControl();
  public filteredUsers: ReplaySubject<DirectoryUsers[]> = new ReplaySubject<
    DirectoryUsers[]
  >(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  protected _onDestroy = new Subject<void>();
  userInfo: string;
  selectedValue: string;

  constructor(private service: InterviewService) {}

  ngOnInit() {
    //this.userCtrl.setValue(this.directoryUsers[10]);
    this.getUsers();
  }

  getUsers() {
    this.service.getDirectoryUsers().subscribe(data => {
      this.directoryUsers = data['resources'];
      this.onfilter();
    });
  }

  onfilter() {
    this.filteredUsers.next(this.directoryUsers.slice());
    this.userFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterUsers();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  protected setInitialValue() {
    this.filteredUsers
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (
          a: DirectoryUsers,
          b: DirectoryUsers
        ) => a && b && a.id === b.id;
      });
  }

  protected filterUsers() {
    if (!this.directoryUsers) {
      return;
    }
    // get the search keyword
    let search = this.userFilterCtrl.value;
    if (!search) {
      this.filteredUsers.next(this.directoryUsers.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the Users
    this.filteredUsers.next(
      this.directoryUsers.filter(
        data => data.fullName.toLowerCase().indexOf(search) > -1
      )
    );
  }
  getUserData(UserName) {
    this.userInfo = UserName;
    console.log('User Name:', this.userInfo);
  }
}
