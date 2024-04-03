export interface ITimelineItemShort<Meta = any> {
  name: string;
  startDate: Date;
  endDate: Date;
  meta?: Meta;
}

export interface ITimelineItem<Meta = any> {
  name: string;
  startDate: Date;
  endDate: Date;
  meta?: Meta;

  setIsExpanded: (value: boolean) => void;
  isExpanded: () => boolean;
  resetHeight: () => void;
  setHeight: (value: number) => void;
  getHeight: () => void;
}

export class TimelineItemModel implements ITimelineItem {
  public name: string;
  public startDate: Date;
  public endDate: Date;
  public meta: any = {};

  private expanded = false;
  private height = 20;

  constructor(payload: ITimelineItemShort) {
    this.name = payload.name;
    this.startDate = payload.startDate;
    this.endDate = payload.endDate;
    this.meta = payload.meta;
  }

  setIsExpanded(value: boolean) {
    this.expanded = value;
  }

  isExpanded() {
    return this.expanded;
  }

  resetHeight() {
    this.height = 20
  };

  setHeight(value: number) {
    this.height = value
  };

  getHeight() {
    return this.height
  };
}
