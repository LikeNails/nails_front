import { useContext } from 'react'
import Basket from '../../../public/assets/icons/Basket.svg'
import { AppContext } from '../../context/AppContext'

export const Navbar = () => {

	const { basket } = useContext(AppContext)

	return (
		<div className = "navbar">
			<div className = "main-logo">
				QPICK
			</div>
			<div className = "navbar__collapse"/>
			<div className = "navbar__basket">
				<Basket className = "baslet-logo"/>
				<div className = "basket-logo_counter">
					{basket.count}
				</div>
			</div>
		</div>
	)
}