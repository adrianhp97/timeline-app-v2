import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';

import { IChartData } from './models/data';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  standalone: true,
  imports: [MatButton, BaseChartDirective],
})
export class ChartComponent  implements OnInit, OnChanges {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

  @Input({ required: true }) data!: IChartData[];

  @Input({ required: true }) dataLabel!: string;

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    scales: {
      x: {},
      y: {},
    }
  };
  public barChartType = 'bar' as const;

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  ngOnInit(): void {
    this.generateData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.generateData();
    }
  }

  generateData() {
    this.barChartData = {
      labels: this.data.map(item => item.label),
      datasets: [
        { data: this.data.map(item => item.value), label: this.dataLabel },
      ],
    }

    console.log(this.barChartData)
  }
}
