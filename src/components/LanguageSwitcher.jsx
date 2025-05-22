import React from 'react'
import { useTranslation } from 'react-i18next'

export const LanguageSwitcher = () => {
	const { i18n } = useTranslation()

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng)
	}

	return (
		<div className="space-x-2 mr-4">
			<button
				onClick={() => changeLanguage('en')}
				className="text-sm underline"
			>
				English
			</button>
			<button
				onClick={() => changeLanguage('ru')}
				className="text-sm underline"
			>
				Русский
			</button>
		</div>
	)
}
