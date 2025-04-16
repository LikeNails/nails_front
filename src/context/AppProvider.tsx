import React, { createContext, useState } from 'react';
import { TProducts } from '../models/product';
import { TBasket } from '../models/basket';
import { TProduct } from '../models/product';

import { data } from '../data/data.js'

import { TAppContext, Language, AppContext } from './AppContext';



export const AppProvider = ({children}: {children: React.ReactNode}) => {
	const [products] = useState<TProducts>(data as TProducts)
	const [basket, setBasket] = useState<TBasket>({
		offers: [],
		count: 0
	})

	const [language, setLanguage] = useState<Language>('rus')

	const changeLanguage = (language: Language) => {
		setLanguage(language)
	}
	
	const addOfferToBasket = (product_id: number) => {
		setBasket((prevBasket) => {
			const existingProduct = prevBasket.offers.find((offer) => 
				offer.product_id === product_id
			)
			if(existingProduct) {
				return {
					...prevBasket,
					offers: prevBasket.offers.map((offer) => 
						offer.product_id === product_id ? {...offer, quantity: offer.quantity + 1} : offer
					),
					count: prevBasket.count + 1,
				}
			}
			return {
				offers: [...prevBasket.offers, {product_id: product_id, quantity: 1}],
				count: prevBasket.count + 1,
			}
		})
	}

	const removeOfferFromBasket = (product_id: number) => {
		setBasket((prevBasket) => {
			const removedOffer = prevBasket.offers.find((offer) => 
				offer.product_id === product_id
			)
			const updatedOffers = prevBasket.offers.filter(
				(offer) => offer.product_id !== product_id
			)
			if(!removedOffer){
				return prevBasket
			}
			return {
				offers: updatedOffers,
				count: prevBasket.count - removedOffer.quantity,
			}
		})
	}

	const value: TAppContext = {
		products,
		basket,
		language,
		changeLanguage,
		addOfferToBasket,
		removeOfferFromBasket
	}

	return <AppContext.Provider value = {value}>{children}</AppContext.Provider>
}