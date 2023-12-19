export interface IVendingGoodsCollectionRequestDescription {}

export interface IDessertDescription {
  desc: string;
  id: number;
  img: IProductImgDescription[];
  name: string;
  price: number;
}

export interface IBeverageDescription {
  desc: string;
  id: number;
  img: IProductImgDescription[];
  ingredients: IProductIngredientsDescription[];
  name: string;
  price: number;
}

export interface IProductImgDescription {
  sm?: string;
  lg?: string;
}

export interface IProductIngredientsDescription {
  id: number;
  img: string;
  name: string;
}
