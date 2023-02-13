/**
 * This file include Definition for Order
 * required for ordering lists by dynamic fields and order direction
 */
export interface Order {
  /** Order By Field Name */
  orderBy: string;
  /** Order Direction: Ascending = true, Descending = false */
  ascending: boolean;
}
