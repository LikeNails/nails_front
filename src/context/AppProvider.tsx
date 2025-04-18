import React, { createContext, useState } from 'react';
import { TProducts } from '../models/product';
import { TBasket, Offer } from '../models/basket';
import { TProduct } from '../models/product';

import { data } from '../data/data.js'

import { TAppContext, Language, AppContext } from './AppContext';



export const AppProvider = ({children}: {children: React.ReactNode}) => {
	const [products] = useState<TProducts>(data as TProducts)
	const [basket, setBasket] = useState<TBasket>(()=> {
		const storedBasket = sessionStorage.getItem('basket');
		return storedBasket 
			? JSON.parse(storedBasket) 
			: {
				offers: [], 
				count: 0
			}
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
			const updatedBasket = existingProduct 
				? {
					...prevBasket,
					offers: prevBasket.offers.map((offer) => 
						offer.product_id === product_id ? {...offer, quantity: offer.quantity + 1} : offer
					),
					count: prevBasket.count + 1,
				}
				: {
					offers: [...prevBasket.offers, {product_id: product_id, quantity: 1}],
					count: prevBasket.count + 1,
				}
			sessionStorage.setItem('basket', JSON.stringify(updatedBasket))
			return updatedBasket;
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
			const updatedBasket = {
				offers: updatedOffers,
				count: prevBasket.count - removedOffer.quantity,
			};

			sessionStorage.setItem('basket', JSON.stringify(updatedBasket))
			return updatedBasket
		})
	}

	const removeOneOfferFromBasket = (product_id: number) => {
		setBasket((prevBasket) => {
			const removedOffer = prevBasket.offers.find((offer) => 
				offer.product_id === product_id
			)

			let updatedOffers: Offer[]
			let updatedBasket: TBasket
			
			if(removedOffer.quantity > 1){
				updatedOffers = prevBasket.offers.map(
					(offer) => {
						if(offer.product_id == removedOffer.product_id){
							offer.quantity -= 1
						}
						return offer
					}
				)
				updatedBasket = {
					offers: updatedOffers,
					count: prevBasket.count - 1,
				};
			}
			else{
				updatedOffers = prevBasket.offers.filter(
					(offer) => offer.product_id !== product_id
				)

				updatedBasket = {
					offers: updatedOffers,
					count: prevBasket.count - removedOffer.quantity,
				};
			}
			
			if(!removedOffer){
				updatedBasket = prevBasket
			}


			sessionStorage.setItem('basket', JSON.stringify(updatedBasket))
			return updatedBasket
		})
	}

	const value: TAppContext = {
		products,
		basket,
		language,
		changeLanguage,
		addOfferToBasket,
		removeOneOfferFromBasket,
		removeOfferFromBasket
	}

	return <AppContext.Provider value = {value}>{children}</AppContext.Provider>
}