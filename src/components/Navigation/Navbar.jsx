import React from 'react'
import { useAppContext } from '@/context/AppContext'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '../LanguageSwitcher'
import './Navbar.css'

export const Navbar = () => {
	const { user, logout } = useAppContext()
	const navigate = useNavigate()
	const { t } = useTranslation()

	return (
		<nav className="bg-white shadow-md mb-6">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between">
				{/* Логотип */}
				<div className="flex items-center space-x-8">
					<Link
						to="/"
						className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold"
					>
						LikeNails
					</Link>

					{/* Навигация для десктопа */}
					<div className="hidden md:flex space-x-6">
						<Link
							to="/"
							className="text-gray-700 hover:text-indigo-600 transition duration-300"
						>
							{t('navbar.home')}
						</Link>
						<Link
							to="/masters"
							className="text-gray-700 hover:text-indigo-600 transition duration-300"
						>
							{t('navbar.masters')}
						</Link>
						<LanguageSwitcher />
					</div>
				</div>

				{/* Пользователь или кнопки входа/регистрации */}
				<div className="flex items-center space-x-4">
					{user ? (
						<>
							<Link to="/dashboard">{t('navbar.dashboard')}</Link>
							{/* Отображение имени пользователя */}
							<span className="text-sm text-gray-600 hidden md:block">
								{t('navbar.hello')},{' '}
								{user.first_name || t('navbar.user')}
							</span>

							<button
								type="button"
								onClick={logout}
								className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
							>
								{t('navbar.logout')}
							</button>
						</>
					) : (
						<>
							<Link
								to="/login"
								className="text-gray-700 hover:text-indigo-600 transition duration-300 hidden md:block"
							>
								{t('navbar.login')}
							</Link>
							<Link
								to="/register"
								className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
							>
								{t('navbar.register')}
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	)
}
