import { Component, Input } from '@angular/core';

import { ITimelineItem } from '../models/item';
import { dateDiffInDays } from '../../utils/date';

@Component({
  selector: 'app-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrl: './timeline-item.component.scss'
})
export class TimelineItemComponent {
  private width = 48;

  @Input({ required: true }) item!: ITimelineItem;

  @Input({ required: true }) position!: number;

  calculateWidth() {
    const dateLength = dateDiffInDays(this.item.startDate, this.item.endDate);
    return dateLength * this.width;
  }
}
