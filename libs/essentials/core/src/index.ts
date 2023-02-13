export * from './lib/essentials-core.module';
import { MetaDataItem, MetaDataIconState, initialMetaDataItem } from './lib/models/meta-data-item';

import { MapItem } from './lib/models/map-item';
import { RouterPayload } from './lib/models/router-payload';
import { Route } from './lib/models/route';
import { PaginationOptions } from './lib/models/pagination-options';
import { Order } from './lib/models/order';
import { Confirmation } from './lib/models/confirmation';
import { ValueAccessorBase } from './lib/components/value-accessor-base';

/**
 * Exporting Models
 */
export {
  Order,
  PaginationOptions,
  Route,
  RouterPayload,
  MapItem,
  Confirmation,
  ValueAccessorBase,
  MetaDataItem,
  MetaDataIconState,
};

export * from './lib/essentials-core.module';
/**
 * Components Declaration & Exporting Section
 */
import { BaseComponent } from './lib/components/base.component';
import { FormComponent } from './lib/components/form.component';
import { ListComponent } from './lib/components/list.component';
export { BaseComponent, FormComponent, ListComponent };
/**
 * Service Declaration & Importing Sectoin
 */
import { IStorageService } from './lib/services/storage/interfaces/istorage-service';
import { Logger } from './lib/services/logger.service';
import { AppTranslateService } from './lib/services/app-translate.service';
import {
  CanComponentDeactivate,
  CanDeactivateGuard,
} from './lib/services/guards/can-deactivate-guard.service';
import { ConfirmationService } from './lib/services/confirmation.service';
import { ModelService } from './lib/services/model.service';
import { SecureService } from './lib/services/secure.service';
import { StorageType } from './lib/services/storage/utils/storage-type';
import { LocalStorageService } from './lib/services/storage/local-storage.service';
import { SessionStorageService } from './lib/services/storage/session-storage.service';
import { MemoryStorageService } from './lib/services/storage/memory-storage.service';
import { CookieStorageService } from './lib/services/storage/cookies-storage.service';
import { AbstractService } from './lib/services/abstract.service';
import { Notification } from './lib/models/notification';
import { NotificationType } from './lib/enums/notification-type.enum';
import { NotificationService } from './lib/services/notification.service';

export {
  Logger,
  AppTranslateService,
  CanComponentDeactivate,
  ConfirmationService,
  CanDeactivateGuard,
  ModelService,
  IStorageService,
  SecureService,
  StorageType,
  MemoryStorageService,
  SessionStorageService,
  LocalStorageService,
  CookieStorageService,
  AbstractService,
  NotificationType,
  Notification,
  NotificationService,
  initialMetaDataItem,
};
