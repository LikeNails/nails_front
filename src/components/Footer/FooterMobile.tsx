import { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'

import Net from '../../assets/icons/NET.svg'

import BurgerMenu from '../../assets/icons/burger-menu.svg'
import { FooterNavigationModal } from './modals/FooterNavigationModal'
import {FooterLanguageModal} from './modals/FooterLanguageModal'
import {Link} from 'react-router'

export const FooterMobile = () => {
	const {changeLanguage, language} = useContext(AppContext)
	const [navModalIsOpen, setNavModalIsOpen] = useState<boolean>(false)
	const [langModalIsOpen, setLangModalIsOpen] = useState<boolean>(false)

	
	const handleCloseNavModal = () => setNavModalIsOpen(false)
	const handleCloseLangModal = () => setLangModalIsOpen(false)

	const changeNavModal = () => setNavModalIsOpen(!navModalIsOpen)
	const changeLanguageModal = () => setLangModalIsOpen(!langModalIsOpen)

	return (
		<div className = 'footer-mobile'>
				<div className = "footer__logo">
					<div className = "main-logo">
						<Link to = "/">
							QPICK
						</Link>
					</div>
				</div>
				<div className = "footer-mobile__nav">
					<div className = "footer-mobile__nav-icon">
						<FooterNavigationModal isNavOpen={navModalIsOpen} onCloseModal={handleCloseNavModal} />
						<button onClick = {changeNavModal} type="button" className="footer-open-nav-modal-button">
							<BurgerMenu className = "burger-menu-icon"/>
						</button>
					</div>
					
				</div>
				<div className = "footer-mobile__lang">
					<div className = "footer-mobile__nav-lang">
						<FooterLanguageModal isNavOpen={langModalIsOpen} onCloseModal={handleCloseLangModal}/>
						<button type="button" onClick={changeLanguageModal} className="footer-open-lang-modal-button">
							<Net className = "net-icon--mobile"/>
						</button>
					</div>
				</div>
		</div>
	)
}