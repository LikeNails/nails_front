import { useContext } from 'react'
import { AppContext } from '../../../context/AppContext'
import { Language } from '../../../context/AppContext'

interface TFooterLanguageModal {
	isNavOpen: boolean
}

export const FooterLanguageModal: React.FC<TFooterLanguageModal> = ({
	isNavOpen,
}) => {
	const { language, changeLanguage } = useContext(AppContext)

	if (!isNavOpen) {
		return null
	}

	return (
		<div className="footer-language-modal">
			<button
				className={
					language === 'kaz'
						? 'col-lang__row__button--selected'
						: 'col-lang__row__button	'
				}
				onClick={() => changeLanguage('kaz')}
			>
				Каз
			</button>
			<button
				className={
					language === 'rus'
						? 'col-lang__row__button--selected'
						: 'col-lang__row__button'
				}
				onClick={() => changeLanguage('rus')}
			>
				Рус
			</button>
			<button
				className={
					language === 'eng'
						? 'col-lang__row__button--selected'
						: 'col-lang__row__button'
				}
				onClick={() => changeLanguage('eng')}
			>
				Eng
			</button>
		</div>
	)
}
