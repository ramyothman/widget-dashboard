import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetTrendChartComponent } from './widget-trend-chart.component';

describe('WidgetTrendChartComponent', () => {
  let component: WidgetTrendChartComponent;
  let fixture: ComponentFixture<WidgetTrendChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WidgetTrendChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WidgetTrendChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
