export type Action = "Buy" | "Sell";

export interface Transaction {
  action: Action;
  assetid: number;
  createdat: string;
  id: number;
  price: number;
  shares: number;
}

export interface Holding {
  asset: string;
  value: number;
  composition: number;
}
export interface Category {
  category: string;
  value: number;
  composition: number;
}

export interface LineData {
  value: number;
  time: string;
}
export interface ValueTimeObject {
    time: string;
    value: number;
  }
