import { Store } from '@ngrx/store';
import * as AppStoreState from './reducers/index';

/**
 * Extended App Store from Store<AppStoreState.State>
 */
export class AppStore extends Store<AppStoreState.State> { }

export { AppStoreState };
