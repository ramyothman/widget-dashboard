export * from './lib/essentials-store.module';
export * from './lib/essentials-store.module';
import { MetaDataReducerUtils } from './lib/utils/state-meta-data-utils';
import * as MainReducer from './lib/reducers';
/**
 * Exporting Store States
 */
import {
  applicationKey,
  ApplicationState,
  applicationInitialState,
} from './lib/states/application.state';
import {
  coreRouterStateKey,
  CoreRouterState,
  coreRouterInitialState,
  routerStoreStateKey,
} from './lib/states/core-router.state';

import {
  StateMetaData,
  stateMetaDataInitialState,
} from './lib/states/state-meta-data.state';


export {
  ApplicationState,
  StateMetaData,
  stateMetaDataInitialState,
  applicationInitialState,
  CoreRouterState,
  coreRouterInitialState,
  coreRouterStateKey,
  applicationKey,
  routerStoreStateKey,
  MetaDataReducerUtils,
  MainReducer,
};

/**
 * Exporting Store Actions
 * p.s. Actions exporting should be added before reducers in case of usage in reducers
 */
import * as ApplicationActions from './lib/actions/application.action';
import * as CoreRouterActions from './lib/actions/router.action';

export {
  ApplicationActions,
  CoreRouterActions,
};

/**
 * Exporting Store Reducers
 */
import * as ApplicationReducer from './lib/reducers/application.reducer';
import * as CoreRouterReducer from './lib/reducers/router.reducer';

export {
  ApplicationReducer,
  CoreRouterReducer,
};

/**
 * Exporting Store Effects
 */
import { ApplicationEffects } from './lib/effects/application.effects';
import { CoreRouterEffects } from './lib/effects/core-router.effects';
export {
  ApplicationEffects,
  CoreRouterEffects,
};

/**
 * Exporting Store Selectors
 */
import { AppStore } from './lib/app.store';
import * as ApplicationSelectors from './lib/selectors/application.selector';
import * as CoreRouterSelectors from './lib/selectors/core-router.selector';

export {
  AppStore,
  ApplicationSelectors,
  CoreRouterSelectors,
};
