import { SingleSelectComponent } from './single-select/single-select.component';
import { EditInterviewComponent } from './edit-interview/edit-interview.component';
import { InterviewService } from './../../shared/services/interview.service';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import {
  MatSort,
  MatTableDataSource,
  MatPaginator,
  MatDialog
} from '@angular/material';
import { InterviewModel } from './../../shared/models/interview';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DeleteInterviewComponent } from './delete-interview/delete-interview.component';
import { AddupdateEventEmmiterService } from '../../shared/services/addupdate-event-emmiter.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MatSnackBar } from '@angular/material';

import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { DirectoryUsers } from 'src/app/shared/models/directory-users';
import { user } from 'src/app/shared/models/user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss'],
  providers: [DatePipe]
})
export class InterviewComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(SingleSelectComponent, { static: true }) userdata;
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  displayedColumns: string[] = [
    'candidateName',
    'contactPerson',
    'dateofInterview',
    'mobileNo',
    'action'
  ];

  dataSource = new MatTableDataSource();
  interviewObj = new InterviewModel();
  index: number;
  id: number;
  todayDate = new Date();
  directoryUsers: DirectoryUsers[];
  public userCtrl: FormControl = new FormControl();
  public userFilterCtrl: FormControl = new FormControl();
  public filteredUsers: ReplaySubject<DirectoryUsers[]> = new ReplaySubject<
    DirectoryUsers[]
  >(1);
  protected _onDestroy = new Subject<void>();
  userInfo: string;
  selectedValue: string;
  userinfoObj = new user();

  constructor(
    private service: InterviewService,
    private http: HttpClient,
    public dialog: MatDialog,
    private eventService: AddupdateEventEmmiterService,
    private alertService: NotificationService,
    public snackbar: MatSnackBar,
    public datepipe: DatePipe
  ) {
    this.interviewObj.dateofInterview = new Date();
    this.loadGridDetailsByDate();
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    if (this.eventService.subsVar === undefined) {
      this.eventService.subsVar = this.eventService.invokeComponentFunction.subscribe(
        (name: string) => {
          this.loadGridDetailsByDate();
        }
      );
    }

    this.getUsers();
  }

  loadGridDetails() {
    this.service.getInterviewList().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  loadGridDetailsByDate() {
    let currentDate = this.datepipe.transform(
      this.interviewObj.dateofInterview,
      'yyyy-MM-ddT18:30:00'
    );
    this.service.getInterviewByDate(currentDate).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getUsers() {
    this.service.getDirectoryUsers().subscribe(data => {
      this.directoryUsers = data['ActiveUsers'];
      this.directoryUsers = this.directoryUsers.filter(
        d => d.DisplayName !== null
      );
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addEvent(filterValue: string, event) {
    this.loadGridDetailsByDate();
    if (event.value != undefined) {
      filterValue = this.datepipe.transform(filterValue, 'yyyy-MM-ddT18:30:00');
    }
    this.dataSource.filter = filterValue.trim();
  }

  clearFilters() {
    this.dataSource.filter = '';
  }

  onSaveButton() {
    debugger;
    this.interviewObj.dateofInterview.setDate(this.interviewObj.dateofInterview.getDate() + 1);

    this.service.postInterview(this.interviewObj).subscribe(
      success => {
        this.alertService.success('Interview details added successfully.');
        this.loadGridDetails();
        this.interviewObj.dateofInterview.setDate(this.interviewObj.dateofInterview.getDate() - 1);

      },
      error => {
        this.alertService.error('Error : Not able to add.');
        this.alertService.error('already exist.');
        this.interviewObj.dateofInterview.setDate(this.interviewObj.dateofInterview.getDate() - 1);
      }
    );
  }

  openDialog(
    i: number,
    interviewId: number,
    candidateName: string,
    contactPerson: string,
    dateofInterview: Date,
    mobileNo: number
  ) {
    this.id = interviewId;
    this.index = i;

    const dialogRef = this.dialog.open(EditInterviewComponent, {
      width: '500px',
      height: '370px',
      panelClass: 'full-width-dialog',
      disableClose: true,
      data: {
        id: interviewId,
        candidateName: candidateName,
        contactPerson: contactPerson,
        dateofInterview: dateofInterview,
        mobileNo: mobileNo
      }
    });
  }

  confirmDeleteDialog(interviewId: number) {
    const dialogRef = this.dialog.open(DeleteInterviewComponent, {
      width: '250px',
      height: '150px',
      panelClass: 'full-width-dialog',
      disableClose: true,
      data: { id: interviewId }
    });
  }
}
