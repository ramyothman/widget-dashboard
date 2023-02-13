/**
 * This file include Definition for State Meta Data Model and Model Initial Data
 * State Meta Data
 */

import { PaginationOptions, Order } from '@factoryplus/core';

/**
 * State Meta Data
 * Common interface to be used in store states
 */
export interface StateMetaData {
  /** loading */
  loading?: boolean;
  /** saving */
  saving?: boolean;
  /** search term */
  searchTerm?: string;
  /** selected */
  selected?: { [id: string]: boolean };
  /** all selected */
  allSelected?: boolean;
  /** order */
  order?: Order;
  /** pagination options */
  paginationOptions?: PaginationOptions;
}

/**
 * @ignore
 * initial meta data state data
 */
export const stateMetaDataInitialState: StateMetaData = {
  loading: false,
  saving: false,
  searchTerm: '',
  selected: { },
  allSelected: false,
  order: { orderBy: '', ascending: false },
  paginationOptions: { count: 50, page: 1, totalCount: 0, totalPages: 1 },
};
