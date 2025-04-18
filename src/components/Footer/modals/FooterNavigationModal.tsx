import {useState, useContext} from 'react'
import { AppContext } from '../../../context/AppContext'
import {Link} from 'react-router-dom'

type FooterNavigationModal 
export const FooterNavigationModal = ({onClose}) => {

	const [isOpen, setIsOpen] 
	return(
		<div className = "footer-navigation-modal">
			<ul className = "footer-navigation-modal__ul">
				<li>
					<Link to ="/">
						Избранное
					</Link>
				</li>
				<li>
					<Link to ="/">
						Корзина
					</Link>
				</li>
				<li>
					<Link to ="/">
						Контакты
					</Link>
				</li>
				<li>
					<Link to ="/">
					Условия сервиса
					</Link>
				</li>
			</ul>
		</div>
	)
}