import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { IChartData } from '../shared/chart/models/data';
import { projects } from '../shared/data/projects';
import { teams } from '../shared/data/teams';
import { ITimelineItemShort } from '../shared/timeline/models/item';
import { parseDate } from '../shared/utils/date';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  public items: ITimelineItemShort[];

  public chartData: IChartData[] = [];

  public priorities = new FormControl('');
  public priorityList: string[] = [];

  public stages = new FormControl('');
  public stageList: string[] = [];

  constructor() {
    this.items = projects.map(item => ({
      name: item['Project'],
      startDate: parseDate(item["Start date"] as string),
      endDate: parseDate(item["Launch date"] as string),
      meta: item
    }) as ITimelineItemShort);

    this.generateChartData();

    this.priorityList = Array.from(new Set(projects.map(item => item['Priority'] as string)));
    this.stageList = Array.from(new Set(projects.map(item => item['Stage'] as string)));
  }

  ngOnInit(): void {
    this.priorities.valueChanges.subscribe(() => {
      this.generateChartData();
    });
    this.stages.valueChanges.subscribe(() => {
      this.generateChartData();
    });
  }

  generateChartData() {
    const memberProjectCounter = teams.reduce((acc, curr) => {
      const members = curr['Team members'].split('; ');
      for (const member of members) {
        acc[member] = 0;
      }
      return acc;
    }, {} as Record<string, number>);

    for (const project of projects) {
      if (this.priorities.value!.length > 0 && !this.priorities.value!.includes(project['Priority'] as string)) {
        continue;
      }
      if (this.stages.value!.length > 0 && !this.stages.value!.includes(project['Stage'] as string)) {
        continue;
      }
      const members = (project['Participants'] as string).split('; ');
      for (const member of members) {
        memberProjectCounter[member]++;
      }
    }

    this.chartData = Object.entries(memberProjectCounter).map(([label, value]) => ({ label, value }) as unknown as IChartData)
  }
}
