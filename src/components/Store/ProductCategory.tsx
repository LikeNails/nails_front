import { TProducts } from "../../models/product";
import {Product} from './Product'

export const ProductCategory = (props: {products: TProducts, type: string}) => {

	const {products, type} = props; 

	return (
		<div className = "product-category">
			<div className = "product-category__header header--gray-text">
				{type}
			</div>
			<div className = "product-category__gallery gallery">
				{
					products.map((product)=>
						{
							return <Product key = {product.id} product = {product}/>
						}
					)
				}
			</div>
		</div>
	)

}