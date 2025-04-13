export interface TProduct {
	id: number,
	img: string,
	title: string,
	price: number,
	on_sale: number,
	rate: number
}

export type TProducts = Array<TProduct>