import { TProduct } from "../../models/product";
import Star from "../../../public/assets/icons/Star.svg" 
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";



export const Product = (props: {product:TProduct}) => {

	const {addOfferToBasket} = useContext(AppContext)
	const { product } = props;

	return (
		<div className = "product">
			<img src={product.img} className = "product__image image"/>
			<div className = "product__info info">
				<h3 className = "product__info__h3 h3">
					{product.title}
				</h3>
				<div className = "info__price">
					<span className = "price-text price-text_current">

					</span>
					{
						product.on_sale && 
						<span className = "price-text price-text_old">
							{product.on_sale}
						</span>
					}
				</div>
				<div className = "info__rating rating">
					<Star className = "start_svg info__rating__svg"/>
					<span>{product.rate}</span>
				</div>
				<button 
					onClick = {() => addOfferToBasket(product.id)} 
					className="info__action-button"
				>
					Купить
				</button>
			</div>
		</div>
	)
}