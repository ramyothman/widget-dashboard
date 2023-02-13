/**
 * This file include Definition for Generic Pagination Options
 * required for list data pagination
 */
export interface PaginationOptions {
  /** current page */
  page: number;
  /** number of items in the page list */
  count: number;
  /** total items in all pages */
  totalCount: number;
  /** total items in all pages */
  totalPages: number;
}
