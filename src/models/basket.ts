import { TProduct } from "./product";

export type Offer = {
	product_id : number,
	quantity: number
}
export interface TBasket {
	offers: Array<Offer>
	count: number
}
