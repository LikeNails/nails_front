import { useContext } from 'react'
import Basket from '../../assets/icons/Basket.svg'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import './Navbar.css'

export const Navbar = () => {
	const { basket } = useContext(AppContext)

	const navigate = useNavigate()

	const handleNavigateToBasket = () => {
		navigate('/basket')
	}

	return (
		<div className="navbar">
			<Link to="/">
				<div className="main-logo">QPICK</div>
			</Link>
			<div className="navbar__collapse" />
			<div className="navbar__basket">
				<Link to="/basket">
					<Basket className="basket-logo svg" />
					<div className="basket-logo__counter">{basket.count}</div>
				</Link>
			</div>
		</div>
	)
}
