import { TProduct } from '../../models/product'
import Star from '../../assets/icons/Star.svg'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

export const Product = (props: { product: TProduct }) => {
	const { addOfferToBasket } = useContext(AppContext)
	const { product } = props

	return (
		<div className="product">
			<div className="product__image-container">
				<img src={product.img} className="product__image image" />
			</div>
			<div className="product__info info">
				<div className="row">
					<div className="product__info__h3">{product.title}</div>
					<div className="collapse" />
					<div className="info__price">
						<div className="price-text price-text_current">
							{`₽ ${product.price}`}
						</div>
						{product.on_sale ? (
							<div className="price-text price-text_old">
								{`₽ ${product.on_sale}`}
							</div>
						) : (
							<div className="price-text price-text_old price-text_old--invisible">
								1
							</div>
						)}
					</div>
				</div>
				<div className="row">
					<div className="info__rating">
						<Star className="info__rating-svg" />
						<span>{product.rate}</span>
					</div>
					<div className="collapse" />
					<button
						onClick={() => addOfferToBasket(product.id)}
						className="info__action-button "
					>
						Купить
					</button>
				</div>
			</div>
		</div>
	)
}
