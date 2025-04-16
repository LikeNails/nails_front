import { useContext } from 'react'

import Net from '../../assets/icons/NET.svg'
import VK from '../../assets/icons/VK.svg'
import Telegram from '../../assets/icons/Telegram.svg'
import Whatsup from '../../assets/icons/Whatsup.svg'

import {Link} from 'react-router'
import { AppContext } from '../../context/AppContext'

import "./Footer.css"

export const Footer = () => {

	const {changeLanguage, language} = useContext(AppContext)
	return (
		<div className = "footer">
				<div className = "footer__logo">
					<div className = "main-logo">
						QPICK
					</div>
				</div>
				<div className = "footer__nav">
					<div className = "footer__nav__ul">
						<ul>
							<li>
								Избранное
							</li>
							<li >
								Корзина
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
						<div className = "row nav__lang__row">
							<Net className = "net-icon"/>
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
						<VK className = "icon icon_vk"/>
						<Telegram className = "icon icon_telegram"/>
						<Whatsup className = "icon icon_whatsup"/>
				</div>
		</div>
	)
}