import { useContext } from 'react'

import Net from '../../../public/assets/icons/NET.svg'
import VK from '../../../public/assets/icons/VK.svg'
import Telegram from '../../../public/assets/icons/Telegram.svg'
import Whatsup from '../../../public/assets/icons/Whatsup.svg'

import {Link} from 'react-router'
import { AppContext } from '../../context/AppContext'
export const Footer = () => {

	const {changeLanguage, language} = useContext(AppContext)
	return (
		<div className = "footer">
			<div className = "row">
				<div className = "col col-logo">
					<div className = "main-logo">
						QPICK
					</div>
				</div>
				<div className = "col col-nav">
					<ul>
						<li>
							Избранное
						</li>
						<li>
							Корзина
						</li>
						<li>
							Контакты
						</li>
					</ul>
				</div>
				<div className = "col col-lang">
					<div className = "row">
						<Link to = "">
							Условия сервиса
						</Link>
					</div>
					<div className = "row col-lang__row">
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
				<div className = "col col-social">
					<div className = "row">
						<VK className = "icon icon_vk"/>
						<Telegram className = "icon icon_telegram"/>
						<Whatsup className = "icon icon_whatsup"/>
					</div>
					<div className = "row" />
				</div>
			</div>
		</div>
	)
}