import { Component, Input } from '@angular/core';

import { ITimelineItem } from '../models/item';

@Component({
  selector: 'app-timeline-panel',
  templateUrl: './timeline-panel.component.html',
  styleUrl: './timeline-panel.component.scss'
})
export class TimelinePanelComponent {
  @Input({ required: true }) items!: ITimelineItem[];

  toggleElement(event: Event, item: ITimelineItem) {
    if (!item.name) return;

    item.setIsExpanded(!item.isExpanded());

    // @ts-ignore
    const component = event.target.closest('.item');

    setTimeout(() => {
      const currentItemHeight = (component?.getBoundingClientRect().height || 16) - 16;
      item.setHeight(currentItemHeight);
    }, 0);
  }
}
