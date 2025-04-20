import {useState, useContext} from 'react'
import { AppContext } from '../../../context/AppContext'
import {Link} from 'react-router-dom'
import VK from '../../../assets/icons/VK.svg'
import Telegram from '../../../assets/icons/Telegram.svg'
import Whatsup from '../../../assets/icons/Whatsup.svg'

interface TFooterNavigationModal {
	onCloseModal: () => void,
	isNavOpen: boolean
}

type VFunc = () => void;

export const FooterNavigationModal: React.FC<TFooterNavigationModal> = ({onCloseModal, isNavOpen}) => {

	if (!isNavOpen) return null;

	return(
		<div className = "footer-navigation-modal">
			<ul className = "footer-navigation-modal__ul">
				<li>
					<Link to="/" onClick={onCloseModal} className="footer-nav-button">
						Избранное
					</Link>
				</li>
				<li>
					<Link to ="/basket" onClick={onCloseModal} className="footer-nav-button">
						Корзина
					</Link>
				</li>
				<li>
					<Link to ="/" onClick={onCloseModal} className="footer-nav-button">
						Контакты
					</Link>
				</li>
				<li>
					<Link to ="/" onClick={onCloseModal} className="footer-nav-button">
					Условия сервиса
					</Link>
				</li>
				<li>
					<a href = "https://t.me/sporamin" target="_blank" rel="noopener noreferrer" className="footer-nav-button">
						<Telegram className = "icon-telegram_mobile"/>
						Telegram
					</a>
				</li>
				<li>
					<a href = "https://wa.me/89503138658"  target="_blank" rel="noopener noreferrer" className="footer-nav-button">
						<Whatsup className = "icon-whatsup_mobile"/>
						Whatsup
					</a>	
				</li>
				<li>
					<a href = "https://vk.com/sporamin" target="_blank" rel="noopener noreferrer" className="footer-nav-button">
						<VK className = "icon-vk_mobile"/>
						Вконтакте
					</a>
				</li>
			</ul>
		</div>
	)
}