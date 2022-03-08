import { IWrapped as IWrappedBox } from '~/utils';

export interface IWrapped extends IWrappedBox {
  cursor?: string
  gap?: number
  minHeight?: string | number
}

export type IWrappedLayout = IWrapped
