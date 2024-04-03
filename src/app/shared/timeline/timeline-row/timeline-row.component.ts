import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';

import { ITimelineItem } from '../models/item';
import { addDateByYears, formatDate, subtractDateByYears } from '../../utils/date';

interface IRoWData {
  date: Date;
  text: string;
  day_of_week: number;
}

@Component({
  selector: 'app-timeline-row',
  templateUrl: './timeline-row.component.html',
  styleUrl: './timeline-row.component.scss'
})
export class TimelineRowComponent implements OnChanges, AfterViewInit {
  @Input() item?: ITimelineItem | undefined;

  @Input() expandedHeight?: number = 20;

  public currentDate: Date = new Date();

  public columns: IRoWData[] = [];

  public itemPosition: number = 0;

  @ViewChild('container') container: ElementRef<HTMLDivElement> = {} as ElementRef;

  constructor() {
    this.generateTimelineGroup();
  }

  ngOnChanges(): void {
    this.updateItemPosition();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.updateItemPosition(), 0)
  }

  generateTimelineGroup(initialDate?: Date): void {
    const startDate = initialDate ?? subtractDateByYears(5);
    startDate.setDate(1);
    const endDate = addDateByYears(10, startDate);
    endDate.setDate(0);

    for (const currentDate = startDate; currentDate < endDate; currentDate.setDate(currentDate.getDate() + 1)) {
      this.columns.push({ date: currentDate, text: formatDate(currentDate), day_of_week: currentDate.getDay() });
    }
  }

  updateItemPosition() {
    if (!this.item) return
    this.itemPosition = this.container?.nativeElement?.querySelector(`div[data-date='${formatDate(this.item.startDate)}']`)?.getBoundingClientRect().left || 0;
  }
}
