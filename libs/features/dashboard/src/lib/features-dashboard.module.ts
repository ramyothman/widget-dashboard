import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from '@factoryplus/ui-library';

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardLayoutComponent,
        children: [
          //{ path: 'dashboard', component: PatientDashboardComponent },
          { path: '', component: DashboardComponent },
          // { path: 'forget-password', component: ForgetPasswordComponent},
          // { path: 'two-factor-auth', component: TwoFactorAuthComponent}
        ],
      },
    ]),
  ],
  declarations: [DashboardComponent],
})
export class FeaturesDashboardModule {}
