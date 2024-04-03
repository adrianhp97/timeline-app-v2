import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

import { addDateByYears, getMonthName, subtractDateByYears, formatDate, subtractDateByDays } from '../../utils/date';

interface IScaleItem {
  date: string;
  day: number;
}

interface IScaleGroup {
  label: string;
  items: IScaleItem[];
}

@Component({
  selector: 'app-timeline-scale',
  templateUrl: './timeline-scale.component.html',
  styleUrl: './timeline-scale.component.scss'
})
export class TimelineScaleComponent implements AfterViewInit {
  public currentDate: Date = new Date();

  public timelineScales: IScaleGroup[] = [];

  @Output() mouseenter = new EventEmitter();

  @Output() scroll = new EventEmitter();

  @ViewChild('container') container: ElementRef<HTMLDivElement> = {} as ElementRef;

  constructor() {
    this.generateTimelineGroup();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const value = this.container.nativeElement.querySelector(`div[data-date='${formatDate(subtractDateByDays(10, this.currentDate))}']`)?.getBoundingClientRect().left || 0;
      this.updateScrollPosition(value);
      this.scroll.emit({ target: { scrollLeft: value } });
    }, 0);
  }

  generateTimelineGroup(initialDate?: Date) {
    const startDate = initialDate ?? subtractDateByYears(5);
    startDate.setDate(1);
    const endDate = addDateByYears(10, startDate);
    endDate.setDate(0);

    let currentGroup: IScaleGroup = { label: '', items: [] };
    for (const currentDate = startDate; currentDate < endDate; currentDate.setDate(currentDate.getDate() + 1)) {
      const groupLabel = `${getMonthName(currentDate)} ${currentDate.getFullYear()}`;
      if (currentGroup.label !== groupLabel) {
        this.timelineScales.push({ ...currentGroup });
        currentGroup.label = groupLabel;
        currentGroup.items = [];
      }

      currentGroup.items.push({ date: formatDate(currentDate), day: currentDate.getDate() });
    }

    this.timelineScales.shift();
  }

  updateScrollPosition(value: number) {
    this.container.nativeElement.scrollLeft = value;
  }

  getScrollPosition() {
    return this.container.nativeElement.scrollLeft
  }

  getPositionForDate(date: Date) {
    return this.container.nativeElement.querySelector(`div[data-date='${formatDate(date)}']`)?.getBoundingClientRect().left || 0;
  }
}
