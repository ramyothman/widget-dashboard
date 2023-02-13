import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './common/widget/widget.component';
import { WidgetTrendChartComponent } from './common/widget-trend-chart/widget-trend-chart.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
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
