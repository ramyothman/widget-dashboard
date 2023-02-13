import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './common/widget/widget.component';
import { WidgetTrendChartComponent } from './common/widget-trend-chart/widget-trend-chart.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';


@NgModule({
  imports: [CommonModule, RouterModule, NgChartsModule, FormsModule, ReactiveFormsModule, CalendarModule,  NgxDaterangepickerMd.forRoot()],
  declarations: [
    WidgetComponent,
    WidgetTrendChartComponent,
    DashboardLayoutComponent,
  ],
  exports: [
    DashboardLayoutComponent,
    WidgetComponent,
    WidgetTrendChartComponent
  ]
})
export class EssentialsUiLibraryModule {}
