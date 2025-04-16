import { AppContext } from '../../context/AppContext'
import { useContext } from "react"

export const Basket = () => {
	
	const {removeOfferFromBasket, addOfferToBasket} = useContext(AppContext)
	return (
		<div className = "basket">
			<div className = "basket__section">
				<div className = "basket__section__header header--gray-text">
					
				</div>
			</div>
		</div>
	)
}