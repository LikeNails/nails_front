import { useContext } from 'react'

import Net from '../../assets/icons/NET.svg'
import VK from '../../assets/icons/VK.svg'
import Telegram from '../../assets/icons/Telegram.svg'
import Whatsup from '../../assets/icons/Whatsup.svg'

import { Link } from 'react-router'
import { AppContext } from '../../context/AppContext'

import './Footer.css'

export const Footer = () => {
	const { changeLanguage, language } = useContext(AppContext)
	return (
		<div className="footer-container">
			<div className="footer">
				<div className="footer__logo">
					<div className="main-logo">
						<Link to="/">QPICK</Link>
					</div>
				</div>
				<div className="footer__nav-container">
					<div className="footer__nav-ul">
						<ul>
							<li>Избранное</li>
							<li>
								<Link to="basket">Корзина</Link>
							</li>
							<li>Контакты</li>
						</ul>
					</div>
					<div className="collapse" />
					<div className="footer__nav-lang">
						<div className="row--top">
							<Link to="" className="nav__link">
								Условия сервиса
							</Link>
						</div>
						<div className="row">
							<Net className="net-icon" />
							<button
								type="button"
								className={
									language === 'kaz'
										? 'button-sm--selected'
										: 'button-sm'
								}
								onClick={() => changeLanguage('kaz')}
							>
								Каз
							</button>
							<button
								type="button"
								className={
									language === 'rus'
										? 'button-sm--selected'
										: 'button-sm'
								}
								onClick={() => changeLanguage('rus')}
							>
								Рус
							</button>
							<button
								type="button"
								className={
									language === 'eng'
										? 'button-sm--selected'
										: 'button-sm'
								}
								onClick={() => changeLanguage('eng')}
							>
								Eng
							</button>
						</div>
					</div>
				</div>
				<div className="footer__social">
					<a
						className="outer-link"
						href="https://vk.com/sporamin"
						target="_blank"
						rel="noopener noreferrer"
					>
						<VK className="icon_vk" />
					</a>

					<a
						className="outer-link"
						href="https://t.me/sporamin"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Telegram className="icon_telegram" />
					</a>

					<a
						className="outer-link"
						href="https://wa.me/89503138658"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Whatsup className="icon_whatsup" />
					</a>
				</div>
			</div>
		</div>
	)
}
