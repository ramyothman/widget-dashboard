import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
        {
          path: 'dashboard',
          loadChildren: () =>
            import('@factoryplus/feature-dashboard').then((m) => m.FeaturesDashboardModule),
        },
];
