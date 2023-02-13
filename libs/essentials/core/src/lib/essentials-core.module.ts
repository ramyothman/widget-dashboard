import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
})
export class EssentialsCoreModule {
  public static forRoot(environment: any): ModuleWithProviders<any> {

    return {
        ngModule: EssentialsCoreModule,
        providers: [
            {
                provide: 'env', // you can also use InjectionToken
                useValue: environment
            }
        ]
    };
}
}
