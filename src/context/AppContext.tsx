import React, {createContext} from 'react'
import { TProducts } from '../models/product'
import { TBasket } from '../models/basket'

export interface TAppContext {
	products: TProducts,
	language: Language,
	basket: TBasket,
	changeLanguage: (language: Language) => void;
	addOfferToBasket: (product_id: number) => void;
	removeOneOfferFromBasket: (product_id: number) => void;
	removeOfferFromBasket: (product_id: number) => void;
}

export type Language = 'kaz' | 'rus' | 'eng'

export const AppContext = createContext<TAppContext | undefined>(undefined)
