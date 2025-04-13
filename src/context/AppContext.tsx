import React, {createContext} from 'react'
import { TProducts } from '../models/product'
import { TBasket } from '../models/basket'

export interface TAppContext {
	products: TProducts,
	basket: TBasket,
	addOfferToBasket: (product_id: number) => void
	removeOfferFromBasket: (product_id: number) => void;
}

export const AppContext = createContext<TAppContext | undefined>(undefined)
