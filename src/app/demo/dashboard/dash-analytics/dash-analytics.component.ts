import { Component } from '@angular/core';
import { ChartDB } from '../../../fack-db/chart-data';
import {ApexChartService} from '../../../theme/shared/components/chart/apex-chart/apex-chart.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dash-analytics',
  templateUrl: './dash-analytics.component.html',
  styleUrls: ['./dash-analytics.component.scss']
})

export class DashAnalyticsComponent {
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
 
todo=[{ type: "a", value: "Get to work" },
{ type: "a", value: "Pick up groceries" },
{ type: "b", value: "Go home" },
{ type: "a", value: "Fall asleep" },
{ type: "b", value: "Walk dog" },
{ type: "a", value: "Get to work" },
{ type: "a", value: "Pick up groceries" },
{ type: "b", value: "Go home" },
{ type: "a", value: "Fall asleep" },
{ type: "b", value: "Walk dog" },{ type: "a", value: "Get to work" },
{ type: "a", value: "Pick up groceries" },
{ type: "b", value: "Go home" },
{ type: "a", value: "Fall asleep" },
{ type: "b", value: "Walk dog" }];
  // done = [
  //   'Get up',
  //   'Brush teeth',
  //   'Take a shower',
  //   'Check e-mail',
  //   'Walk dog'
  // ];
 done=[{ type: "a", value: "Get up" },
{ type: "b", value: "Brush teeth" },
{ type: "a", value: "Take a shower" },
{ type: "b", value: "Check e-mail" }];
   
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
