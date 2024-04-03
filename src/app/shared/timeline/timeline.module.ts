import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { TimelineComponent } from './timeline.component';
import { TimelineItemComponent } from './timeline-item/timeline-item.component';
import { TimelinePanelComponent } from './timeline-panel/timeline-panel.component';
import { TimelineScaleComponent } from './timeline-scale/timeline-scale.component';
import { TimelineBoardComponent } from './timeline-board/timeline-board.component';
import { TimelineRowComponent } from './timeline-row/timeline-row.component';



@NgModule({
  declarations: [
    TimelineComponent,
    TimelineItemComponent,
    TimelinePanelComponent,
    TimelineScaleComponent,
    TimelineBoardComponent,
    TimelineRowComponent
  ],
  imports: [
    CommonModule,
    ScrollingModule,
  ],
  exports: [
    TimelineComponent,
  ]
})
export class TimelineModule { }
