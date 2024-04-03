import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';

import { ChartComponent } from './chart/chart.component';
import { ContainerComponent } from './components/container/container.component';
import { TimelineModule } from './timeline/timeline.module';



@NgModule({
  declarations: [
    ContainerComponent,
  ],
  imports: [
    CommonModule,
    TimelineModule,
    BaseChartDirective,
    ChartComponent,
  ],
  exports: [
    TimelineModule,
    ContainerComponent,
    ChartComponent,
  ]
})
export class SharedModule { }
