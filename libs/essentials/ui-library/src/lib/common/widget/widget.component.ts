import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseComponent, SecureService } from '@factoryplus/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import * as dayjs from 'dayjs';


@Component({
  selector: 'factoryplus-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
})
export class WidgetComponent extends BaseComponent implements OnInit {
  selected: {start: dayjs.Dayjs, end:dayjs.Dayjs} = { start:  dayjs(new Date('2022-02-01')), end: dayjs(new Date('2022-02-10'))};
  data: any[] = [];
  rowData: any[] = [];
  filteredData: any[] = [];
  lineChartData: ChartDataset[] = [
    { data: this.data.map((item) => item.Price), label: 'Price' },
  ];
  lineChartLabels = this.data.map((item) => item.Time);
  lineChartOptions: ChartOptions = {
    responsive: true,
  };
  
  lineChartType: ChartType = 'line';
  constructor(
    private secureService: SecureService,
    private cd: ChangeDetectorRef
  ) {
    super();
    
    
  }
  ngOnInit() {
    this.rowData = this.secureService.getData();
    this.changeData('month');
    console.log(this.data);
    this.cd.detectChanges();
    this.selected = { start:  dayjs(new Date('2022-02-01')), end: dayjs(new Date('2022-02-10'))};
    console.log(this.selected);
  }

  ngModelChange(event: any) {
    if (!event.start) {
      return;
    }
    this.changeData('month');
    console.log(event.start.$d);
  }

  // Function to change the chart data and labels based on time aggregation
  public renderData() {
    console.log(this.data);
    this.lineChartData = [
      { data: this.data.map((item) => item.Price), label: 'Price' },
    ];
    this.lineChartLabels = this.data.map((item) => item.Time);
    this.cd.detectChanges();
  }

  filterData(startDate: Date, endDate: Date) {
    this.filteredData = this.rowData.filter(item => {
      const date = new Date(item.Time);
      return date >= startDate && date <= endDate;
    });
  }

  public changeData(aggregation: string) {
    this.filteredData = this.rowData;
    if (this.selected.end && this.selected.start) {
      this.filterData(this.selected.start.toDate(), this.selected.end.toDate());
    }
    switch (aggregation) {
      case 'day':
        this.data = this.secureService.groupByDay(this.filteredData);
        break;
      case 'month':
        this.data = this.secureService.groupByMonth(this.secureService.groupByDay(this.filteredData));
        break;
      case 'quarter':
        this.data = this.secureService.groupByQuarter(this.secureService.groupByMonth(this.filteredData));
        break;
      case 'year':
        this.data = this.secureService.groupByYear(this.secureService.groupByMonth(this.filteredData));
        break;
    }
    this.renderData();
  }

  chartHovered(event: any) {
    console.log(event);
  }
  public chartClicked(event: any) {
    console.log(event, this.selected, dayjs(new Date('2022-02-01')));
  }
}
