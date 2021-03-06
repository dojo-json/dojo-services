import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthRoutingModule } from './auth-routing.module';

import { SharedModule } from '@app/shared';

import * as fromInterceptors from './interceptors';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import * as fromServices from './services';
import * as fromGuards from './guards';
import * as fromStore from './store';

const components = [...fromComponents.components, ...fromContainers.containers];

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: components,
  exports: components,
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
      providers: [
        ...fromServices.services,
        ...fromGuards.guards,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: fromInterceptors.AuthInterceptor,
          multi: true,
        },
      ],
    };
  }
}

@NgModule({
  imports: [
    AuthModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', fromStore.reducers),
    EffectsModule.forFeature([fromStore.AuthEffects]),
  ],
})
export class RootAuthModule {}
