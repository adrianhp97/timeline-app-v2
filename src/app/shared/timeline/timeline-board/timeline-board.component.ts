import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { ITimelineItem } from '../models/item';

@Component({
  selector: 'app-timeline-board',
  templateUrl: './timeline-board.component.html',
  styleUrl: './timeline-board.component.scss'
})
export class TimelineBoardComponent {
  @Input({ required: true }) items!: ITimelineItem[];

  @Output() mouseenter = new EventEmitter();

  @Output() scroll = new EventEmitter();

  @ViewChild('container') container: ElementRef<HTMLDivElement> = {} as ElementRef;

  updateScrollPosition(value: number) {
    this.container.nativeElement.scrollLeft = value;
  }

  getScrollPosition() {
    return this.container.nativeElement.scrollLeft
  }
}
