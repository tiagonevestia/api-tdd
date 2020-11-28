import { PurchaseModel } from "@/domain/models";

export interface LoadPurchases {
  loadAll(): Promise<Array<LoadPurchases.Request>>;
}

export namespace LoadPurchases {
  export type Request = PurchaseModel;
}
