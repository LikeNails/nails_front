import React, {useContext, useState} from 'react'
import {TProducts, TProduct} from '../../models/product'
import { AppContext } from '../../context/AppContext';
import { ProductCategory } from './ProductCategory';
import "./styles/Store.css"
const groupProductsByType = (products: TProduct[]) => {
    return products.reduce((acc, product: TProduct) => {
        const type = product.type;
        if (!acc[type]) {
            acc[type] = [];
        }
        acc[type].push(product);
        return acc;
    }, {} as Record<string, TProduct[]>);
};

export const Store = () => {

    const {products} = useContext(AppContext)
    const product_groups = groupProductsByType(products)

    return (
        <div className = "store">
            <div className = "store__gallery">
                {
                    Object.entries(product_groups).map(
                        ([type, products]) => (
                            <ProductCategory key = {type} products={products} type = {type} />
                        )
                    )
                }
            </div>
            
        </div>
    )
}