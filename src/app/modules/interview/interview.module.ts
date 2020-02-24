import { InterviewComponent } from './interview.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewRoutingModule } from './interview-routing.module';
import {SharedModule} from '../../theme/shared/shared.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SingleSelectComponent } from './single-select/single-select.component';
import { JwtInterceptor } from '../../shared/helpers/jwt.interceptor';

@NgModule({
  imports: [
    CommonModule,
    InterviewRoutingModule,
    SharedModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    NgxMatSelectSearchModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,


  ],
  declarations: [InterviewComponent, SingleSelectComponent],
  providers: [],

})
export class InterviewModule { }
