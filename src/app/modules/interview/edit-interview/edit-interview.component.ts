import { InterviewService } from './../../../shared/services/interview.service';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddupdateEventEmmiterService } from '../../../shared/services/addupdate-event-emmiter.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { DirectoryUsers } from 'src/app/shared/models/directory-users';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-edit-interview',
  templateUrl: './edit-interview.component.html',
  styleUrls: ['./edit-interview.component.scss'],
  providers: [DatePipe]
})
export class EditInterviewComponent implements OnInit {
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

  constructor(
    public dialogRef: MatDialogRef<EditInterviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: InterviewService,
    private eventService: AddupdateEventEmmiterService,
    private alertService: NotificationService,
    public snackbar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.service.getDirectoryUsers().subscribe(data => {
      this.directoryUsers = data['ActiveUsers'];
      this.directoryUsers = this.directoryUsers.filter(d => d.DisplayName !== null);
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

  protected setInitialValue() {
    this.filteredUsers
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
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
        data => data.DisplayName.toLowerCase().indexOf(search) > -1
      )
    );
  }

  getUserData(UserName) {
    this.userInfo = UserName;
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onUpdateDate(){
    this.data.dateofInterview.setDate(this.data.dateofInterview.getDate() + 1);
  }

  onEdit(interviewId: number) {
    debugger;
    this.service.putInterview(this.data, interviewId).subscribe(
      success => {
        this.alertService.success('Interview details updated successfully.');
        this.eventService.onSaveOnUpdate();
        console.log("inside");
      },
      error => {
        this.alertService.error('Error : Not able to update.');
      }
    );
  }
}
