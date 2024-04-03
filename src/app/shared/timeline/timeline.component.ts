import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { TimelineBoardComponent } from './timeline-board/timeline-board.component';
import { TimelineScaleComponent } from './timeline-scale/timeline-scale.component';
import { ITimelineItem, ITimelineItemShort, TimelineItemModel } from './models/item';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit, OnChanges {
  @Input({ required: true }) items!: ITimelineItemShort[];

  @ViewChild(TimelineBoardComponent) private boardComponent!: TimelineBoardComponent;
  @ViewChild(TimelineScaleComponent) private scaleComponent!: TimelineScaleComponent;

  public itemsFormatted: ITimelineItem[] = [];

  public currentElement: string = 'scale';

  public emptyItems: ITimelineItem[] = [];

  ngOnInit(): void {
    this.fillEmptyItems();
    this.formatItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.fillEmptyItems();
      this.formatItems();
    }
  }

  updateVerticalScroll(event: UIEvent): void {
    // @ts-ignore
    const value = event.target.scrollLeft
    if (this.currentElement === 'board') {
      this.scaleComponent.updateScrollPosition(value);
    } else if (this.currentElement === 'scale') {
      this.boardComponent.updateScrollPosition(value);
    }
  }

  updateCurrentElement(element: 'scale' | 'board') {
    this.currentElement = element;
  }

  fillEmptyItems() {
    if (this.items.length < 7) {
      this.emptyItems = (new Array(7 - this.items.length)).fill({});
    }
  }

  formatItems() {
    this.itemsFormatted = this.items.map(item => new TimelineItemModel(item))
  }
}
