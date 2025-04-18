import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

import Net from '../../assets/icons/NET.svg'
import VK from '../../assets/icons/VK.svg'
import Telegram from '../../assets/icons/Telegram.svg'
import Whatsup from '../../assets/icons/Whatsup.svg'

import {Link} from 'react-router'

export const FooterMobile = () => {
	const {changeLanguage, language} = useContext(AppContext)
	return (
		<div className = 'relative-container'>
			<div className = 'footer'>
					<div className = "footer__logo">
						<div className = "main-logo">
							<Link to = "/">
								QPICK
							</Link>
						</div>
					</div>
					<div className = "footer__nav">
						<div className = "footer__nav__ul">
							<ul>
								<li>
									Избранное
								</li>
								<li >
									<Link to = "basket">
										Корзина
									</Link>
								</li>
								<li>
									Контакты
								</li>
							</ul>
						</div>
						<div className ="collapse"/>
						<div className = "footer__nav__lang">
							<div className = "row nav__lang__row">
								<Link to = "" className = "nav__link">
									Условия сервиса
								</Link>
							</div>
							<div className = "row nav__lang__row nav__lang__row--top">
								<Net className = "net-icon svg"/>
								<button className = {
									language === 'kaz' 
										? "col-lang__row__button--selected" 
										: "col-lang__row__button"} 
										onClick = {() => changeLanguage('kaz')}
								>
									Каз
								</button>
								<button className = {
									language === 'rus' 
										? "col-lang__row__button--selected" 
										: "col-lang__row__button"} 
										onClick = {() => changeLanguage('rus')}
								>
									Рус
								</button>
								<button className = {
									language === 'eng' 
										? "col-lang__row__button--selected" 
										: "col-lang__row__button"} 
										onClick = {() => changeLanguage('eng')}
								>
									Eng
								</button>
							</div>
						</div>
					</div>
					<div className = "footer__social">
							<a href = "https://vk.com/sporamin" target="_blank" rel="noopener noreferrer">
								<VK className = "svg icon_vk"/>
							</a>

							<a href = "https://t.me/sporamin" target="_blank" rel="noopener noreferrer">
								<Telegram className = "svg icon_telegram"/>
							</a>
							
							<a href = "https://wa.me/89503138658"  target="_blank" rel="noopener noreferrer">
								<Whatsup className = "svg icon_whatsup"/>
							</a>
					</div>
			</div>
		</div>
	)
}