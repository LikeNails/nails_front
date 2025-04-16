import { TProducts } from "../../models/product";
import {Product} from './Product'

export const ProductCategory = (props: {products: TProducts, type: string}) => {

	const {products, type} = props; 

	return (
		<div className = "product-category">
			<h1 className = "product_category__header header--gray-text">
				{type}
			</h1>
			<div className = "product-category__galley gallery">
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