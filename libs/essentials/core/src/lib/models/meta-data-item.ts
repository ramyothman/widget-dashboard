export enum MetaDataIconState{
  none = 'none',
  icon = 'icon',
  image = 'image',
  imageBox = 'image-box'
}
export interface MetaDataItem {
    name: string;
    icon?: string;
    iconState?: MetaDataIconState;
    inBrackets?: boolean;
    order?: number;
    validators?: any[];
  }

  export const initialMetaDataItem: MetaDataItem = {
    name: '',
    validators: []
  }
