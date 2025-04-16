import { TProduct } from "../../models/product";
import Star from "../../assets/icons/Star.svg" 
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";



export const Product = (props: {product:TProduct}) => {

	const {addOfferToBasket} = useContext(AppContext)
	const { product } = props;

	return (
		<div className = "product">
			<div className = "product__image-container">
				<img src={product.img} className = "product__image image"/>
			</div>
			<div className = "product__info info">
				<div className = "row">
					<div className = "product__info__h3">
						{product.title}
					</div>
					<div className = "collapse"/>
					<div className = "info__price">
						<span className = "price-text price-text_current">
							{product.price}
						</span>
						{
							product.on_sale && 
							<span className = "price-text price-text_old">
								{product.on_sale}
							</span>
						}
					</div>
				</div>
				<div className = "row">
					<div className = "info__rating rating">
						<Star className = "start_svg info__rating__svg svg"/>
						<span>{product.rate}</span>
					</div>
					<div className = "collapse"/>
					<button 
						onClick = {() => addOfferToBasket(product.id)} 
						className="info__action-button "
					>
						Купить
					</button>
				</div>
			</div>
		</div>
	)
}