/*
 * This file include Definition for reducer helper methods for
 * state meta data methods includes [loading, reset, select, order, change page etc...]
 */
import { PaginationOptions } from '@factoryplus/core';
import { StateMetaData, stateMetaDataInitialState } from '../states/state-meta-data.state';


/**
 * MetaData Reducer Utils Class
 */
export class MetaDataReducerUtils {
  /**
   * Reset StateMetaData to initial state
   */
  public static reset(): StateMetaData {
    return { ...stateMetaDataInitialState };
  }

  /**
   * Loading items => selected will be reseted.
   * To edit selected items use editItems instead
   * @param {StateMetaData} metaData state meta data
   */
  public static loading(metaData: StateMetaData): StateMetaData {
    return {
      ...metaData,
      selected: { },
      allSelected: false,
      loading: true,
    };
  }

  /**
   * Loading items => selected will be reseted.
   * To edit selected items use editItems instead
   * @param {StateMetaData} metaData state meta data
   */
  public static loadingAndResetPage(metaData: StateMetaData): StateMetaData {
    const paginationOptions: PaginationOptions = {
      ...metaData.paginationOptions,
      page: 1,
      totalCount: 0,
      totalPages: 1,
      count: 0,
    };
    return {
      ...metaData,
      selected: { },
      allSelected: false,
      loading: true,
      paginationOptions,
    };
  }

  /**
   * loading completed reset loading
   * @param {StateMetaData} metaData state meta data
   */
  public static loadingComplete(metaData: StateMetaData): StateMetaData {
    return {
      ...metaData,
      loading: false,
    };
  }

  /**
   * setting saving
   * @param {StateMetaData} metaData state meta data
   */
  public static saving(metaData: StateMetaData): StateMetaData {
    return {
      ...metaData,
      saving: true,
    };
  }

  /**
   * saving complete - resetting saving
   * @param {StateMetaData} metaData state meta data
   */
  public static savingComplete(metaData: StateMetaData): StateMetaData {
    return {
      ...metaData,
      saving: false,
    };
  }

  /**
   * failed - resetting saving & loading
   * @param {StateMetaData} metaData state meta data
   */
  public static failed(metaData: StateMetaData): StateMetaData {
    return {
      ...metaData,
      loading: false,
      saving: false,
    };
  }

  /**
   * change page to given number
   * @param {StateMetaData} metaData state meta data
   */
  public static changePage(
    metaData: StateMetaData,
    page: number
  ): StateMetaData {
    const paginationOptions: PaginationOptions = {
      ...(metaData.paginationOptions as PaginationOptions),
      page: page || 1,
    };
    return {
      ...metaData,
      paginationOptions: paginationOptions as PaginationOptions,
    };
  }

  /**
   * order by given field
   * @param {StateMetaData} metaData state meta data
   */
  public static orderBy(
    metaData: StateMetaData,
    orderby: string
  ): StateMetaData {
    const order = {
      ...metaData.order,
      orderBy: orderby,
      ascending:
        metaData.order?.orderBy === orderby ? !metaData.order?.ascending : true,
    };
    const paginationOptions: PaginationOptions = {
      ...(metaData.paginationOptions as PaginationOptions),
      page: 1,
    };
    return {
      ...metaData,
      order,
      paginationOptions,
    };
  }

  /**
   * update page total
   * @param {StateMetaData} metaData state meta data
   */
  public static updatePageTotal(
    metaData: StateMetaData,
    totalRecords: number
  ): StateMetaData {
    const paginationOptions: PaginationOptions = {
      ...(metaData.paginationOptions as PaginationOptions),
      totalCount: totalRecords,
      totalPages: Math.ceil(
        totalRecords /
          (metaData.paginationOptions?.count
            ? metaData.paginationOptions.count
            : 0)
      ),
    };
    return {
      ...metaData,
      paginationOptions,
    };
  }

  /**
   * update page total & page number
   * @param {StateMetaData} metaData state meta data
   */
  public static updatePageTotalandPageNumber(
    metaData: StateMetaData,
    totalRecords: number,
    pageNumber?: number
  ): StateMetaData {
    const paginationOptions: PaginationOptions = {
      ...(metaData.paginationOptions as PaginationOptions),
      page:
        pageNumber ||
        (metaData?.paginationOptions?.page
          ? metaData.paginationOptions.page
          : 0),
      totalCount: totalRecords,
      totalPages: Math.ceil(
        totalRecords /
          (metaData?.paginationOptions?.count
            ? metaData.paginationOptions.count
            : 0)
      ),
    };
    return {
      ...metaData,
      paginationOptions,
      loading: false,
    };
  }

  /**
   * change filter
   * After changing a filter, the pagination must be reseted.
   * @param {StateMetaData} metaData state meta data
   * @param searchTerm term to be filtered with
   */
  public static changeFilter(
    metaData: StateMetaData,
    searchTerm?: string
  ): StateMetaData {
    return {
      ...metaData,
      paginationOptions: stateMetaDataInitialState.paginationOptions,
      searchTerm: searchTerm != null ? searchTerm : metaData.searchTerm, // An empty string is a valid search term
    };
  }

  /**
   * edit items loading
   * After reloading, the received items may change. Therefore, the pagination must be reset.
   * @param {StateMetaData} metaData state meta data
   */
  public static editItems(metaData: StateMetaData): StateMetaData {
    return {
      ...metaData,
      paginationOptions: stateMetaDataInitialState.paginationOptions,
      loading: true,
    };
  }

  /**
   * check if meta data has selection
   * @param {StateMetaData} metaData state meta data
   */
  public static hasSelection(metaData: StateMetaData): boolean {
    let result = false;
    if (!metaData || !metaData.selected) {
      return result;
    }
    const keys = Object.keys(metaData.selected);
    for (const item of keys) {
      if (metaData.selected[item]) {
        result = true;
      }
    }
    return result;
  }

  /**
   * reselect node
   * @param {StateMetaData} metaData state meta data
   * @param {string} node node to be selected
   * @param {string} primaryKey primary key
   * @param {string} groupId group id
   * @param {string} childId child id
   */
  public static reSelectNode(
    metaData: StateMetaData,
    node: any,
    primaryKey?: string,
    groupId?: string,
    childId?: string
  ): StateMetaData {
    const keys = Object.keys(metaData.selected as { [id: string]: boolean });
    let result = { ...metaData };
    for (const key of keys) {
      result = MetaDataReducerUtils.select(
        result,
        key,
        false,
        [],
        node,
        primaryKey,
        groupId,
        childId
      );
      result = MetaDataReducerUtils.select(
        result,
        key,
        false,
        [],
        node,
        primaryKey,
        groupId,
        childId
      );
    }
    return result;
  }

  /**
   * select key or select key from node
   * deselects if key is already selected.
   * @param {StateMetaData} metaData state meta data
   * @param select key to be selected
   * @param selectOneOnly select one only in the list
   * @param list list of items
   * @param node current node
   * @param primaryKey primary key
   * @param groupId group id
   * @param childId child id
   */
  public static select(
    metaData: StateMetaData,
    select: string,
    selectOneOnly?: boolean,
    list?: any[],
    node?: any,
    primaryKey?: string,
    groupId?: string,
    childId?: string
  ): StateMetaData {
    let selected = metaData.selected ? { ...metaData.selected } : { };
    let allSelected = metaData.allSelected;
    let childNodeKeys: string[] = [];
    const primaryKeyValue = primaryKey ? primaryKey : '';
    if (!selectOneOnly && node) {
      childNodeKeys = MetaDataReducerUtils.getChildNodeKeys(
        node,
        primaryKeyValue,
        groupId,
        childId
      );
    }
    if (selected[select]) {
      allSelected = false;
      delete selected[select];
      for (const child of childNodeKeys) {
        delete selected[child];
      }
    } else {
      primaryKey = primaryKey || 'id';
      if (selectOneOnly) {
        selected = { };
      }
      selected[select] = true;
      for (const child of childNodeKeys) {
        selected[child] = true;
      }
      allSelected = true;
      if (list) {
        list.forEach((o) => {
          if (
            selected[o[primaryKeyValue]] === undefined ||
            selected[o[primaryKeyValue]] === null ||
            !selected[o[primaryKeyValue]]
          ) {
            allSelected = false;
          }
        });
      }
    }

    return {
      ...metaData,
      selected,
      allSelected,
    };
  }

  /**
   * Get Child Node Keys
   * @param node node
   * @param primaryKey primary key
   * @param groupId group id
   * @param childId child id
   */
  public static getChildNodeKeys(
    node: any,
    primaryKey: string,
    groupId?: string,
    childId?: string
  ): string[] {
    let result: string[] = [];
    if (!node || !groupId || !primaryKey) {
      return result;
    }
    for (const group of node[groupId]) {
      if (childId) {
        for (const child of group[childId]) {
          result.push(child[primaryKey].toString());
          result = result.concat(
            MetaDataReducerUtils.getChildNodeKeys(
              child,
              primaryKey,
              groupId,
              childId
            )
          );
        }
      } else {
        result.push(group[primaryKey].toString());
        result = result.concat(
          MetaDataReducerUtils.getChildNodeKeys(
            group,
            primaryKey,
            groupId,
            childId
          )
        );
      }
    }
    return result;
  }

  /**
   * unselect all
   * @param {StateMetaData} metaData state meta data
   */
  public static unSelectAll(metaData: StateMetaData): StateMetaData {
    return {
      ...metaData,
      selected: { },
      allSelected: false,
    };
  }

  /**
   * select all
   * @param {StateMetaData} metaData state meta data
   * @param list list to select all from
   * @param primaryKey primary key
   */
  public static selectAll(
    metaData: StateMetaData,
    list?: any[],
    primaryKey?: string
  ): StateMetaData {
    let selected = { };
    if (metaData.allSelected) {
      return {
        ...metaData,
        selected,
        allSelected: false,
      };
    } else {
      if (list && primaryKey) {
        const primaryKeyValue = primaryKey || 'id';
        selected = list
          .map((o) => o[primaryKeyValue])
          .reduce((prev, curr) => {
            const obj = { ...prev };
            obj[curr] = true;
            return obj;
          }, { });
      }
      return {
        ...metaData,
        selected,
        allSelected: true,
      };
    }
  }
}
