import { TProduct } from "@/models/product"
import Minus from '../../assets/icons/minus.svg'
import Plus from '../../assets/icons/plus.svg'
import Trash from '../../assets/icons/trash.svg'
import { AppContext } from "@/context/AppContext"
import { useContext } from "react"

import './styles/Basket.css'

export const BasketItem = (props: {offer: TProduct & {quantity: number}} ) => {
	
	const {addOfferToBasket, removeOneOfferFromBasket, removeOfferFromBasket} = useContext(AppContext)
	const { offer} = props;

	return (
		<div className = "basket-item">
			<div className = "basket-item__visual">
				<div className = "basket__image-container">
					<img src={offer.img} className = "basket-item__image image"/>
				</div>

				<div className ="counter-menu">
					<button className= "counter-menu__button" onClick = {()=>removeOneOfferFromBasket(offer.id)}>
						{/* <Minus className= "svg minus"/> */}
						{/* короткое тире */}
						– 
					</button>
					<div className = "counter-menu__counter">
						{offer.quantity}
					</div>
					<button className= "counter-menu__button" onClick = {()=>addOfferToBasket(offer.id)}>
						{/* <Plus className= "svg plus"/> */}
						+
					</button>

				</div>
			</div>

			<div className = "basket-item__info">
					<div className = "product__info__h3">
						{offer.title}
					</div>
					<span className = "price-text">
							{`${offer.price} ₽`}
					</span>
			</div>

			<div className = "basket-item__price">
				<span className = "price-text_black">
					{offer.price * offer.quantity}
				</span>
			</div>
			
			<button onClick = {()=>removeOfferFromBasket(offer.id)} className = "trash-button">
				<Trash className = "svg trash"/>
			</button>
			
		</div>
	)
}