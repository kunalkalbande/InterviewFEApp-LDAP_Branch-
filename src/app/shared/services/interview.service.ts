import { Login } from './../models/login';
import { InterviewModel } from './../models/interview';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DirectoryUsers } from '../models/directory-users';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  constructor(private http: HttpClient) {}
  LoginModel = new Login();

  getInterviewList(): Observable<InterviewModel[]> {
    return this.http.get<InterviewModel[]>('/Interview');
  }

  getDirectoryUsers(): Observable<DirectoryUsers[]> {
    this.LoginModel = JSON.parse(localStorage.getItem('loginModel'));
    return this.http.get<DirectoryUsers[]>(
      '/Directory/GetUsers'
    );
  }

  getInterviewByDate(interviewDate: string): Observable<InterviewModel[]> {
    return this.http.get<InterviewModel[]>('/Interview/GetInterviewByDate/' + interviewDate);
  }

  deleteInterview(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.delete<any>('/Interview' + '/' + id, httpOptions);
  }

  putInterview(interviewModel: InterviewModel, id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<any>(
      '/Interview' + '/' + id,
      interviewModel,
      httpOptions
    );
  }

  postInterview(interviewModel: InterviewModel): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http
      .post<InterviewModel>('/Interview', interviewModel, httpOptions)
      .catch(this.errorHandler)
  }
  errorHandler(error: Response) {
    return Observable.throw(error);
  }
}
