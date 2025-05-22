import React from 'react'
import { useTranslation } from 'react-i18next'

export const Footer = () => {
	const { t } = useTranslation()

	return (
		<footer className="bg-white border-t mt-auto py-6">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between items-center">
					{/* Логотип и копирайт */}
					<div className="mb-6 md:mb-0 text-center md:text-left">
						<h3 className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-xl font-bold">
							LikeNails
						</h3>
						<p className="text-gray-600 mt-2">
							{t('footer.copyright')}
						</p>
					</div>

					{/* Контакты и адрес */}
					<div className="text-center md:text-right space-y-2">
						<div>
							<p className="text-gray-700 font-medium">
								{t('footer.address')}
							</p>
						</div>
						<div>
							<a
								href="tel:+74951234567"
								className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
							>
								{t('footer.phone')}
							</a>
						</div>
						<div>
							<a
								href="mailto:info@likenails.ru"
								className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
							>
								{t('footer.email')}
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
