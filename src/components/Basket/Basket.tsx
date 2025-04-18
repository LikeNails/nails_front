import { AppContext } from '../../context/AppContext'
import { useContext, useState} from "react"
import { BasketItem } from './BasketItem'

import { useEffect } from 'react'

export const Basket = () => {

	const {removeOfferFromBasket, addOfferToBasket, products, basket, language} = useContext(AppContext)

	const basket_products = products
		.filter((product) => 
			basket.offers.some((offer) => offer.product_id === product.id)
		)
		.map((product) => {
			const offer = basket.offers.find((offer) => offer.product_id === product.id)
			return {
				...product,
				quantity: offer ? offer.quantity : 0,
			}
		})


	const [sumOfBasket, updateSumOfBasket] = useState<number>(0)
	
	const calcSummOfBasket = () => {
		let sum = 0
		basket_products.map((offer) => {
			for(let i = 0; i < offer.quantity; i++ ){
				sum += offer.price
			}
		})
		updateSumOfBasket(sum)
	}

	useEffect(() => {
        calcSummOfBasket();
    }, [basket]);

	return (
		<div className = "basket">
			<div className = "basket__header header">
				Корзина
			</div>

			<div className = "basket__content">
				{
					basket_products.length !== 0
					? (
						<>
							<div className = "basket__ul">
								{
									basket_products.map((offer) => 
										<BasketItem key={offer.id} offer = {offer}/>
									)
								}
							</div>
						</>
					)
					: (
						<>
						</>
					)
				}
				<div className = "basket__buy">
					<div className = "basket__buy__info">
						<div className = "header">
							ИТОГО
						</div>
						<div className = "basket__buy__summ">
							{
								`₽ ${sumOfBasket}`	
							}
						</div>
					</div>
					<button className = "basket__buy__confirm-button">
						Перейти к оформлению
					</button>
				</div>
			</div>
		</div>
	)
}