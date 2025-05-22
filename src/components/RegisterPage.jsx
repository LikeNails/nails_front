import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const RegisterPage = () => {
	const { register, error, loading } = useAppContext()
	const [formData, setFormData] = useState({
		first_name: '',
		family_name: '',
		email: '',
		password: '',
		confirm_password: '',
		phone_number: '',
	})
	const { t } = useTranslation()

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		if (formData.password !== formData.confirm_password) {
			setError(t('register.passwordMismatch'))
			return
		}

		const { confirm_password, ...rest } = formData
		register(rest).catch((err) => {
			console.error('Ошибка регистрации:', err)
		})
	}

	return (
		<div className="max-w-md mx-auto mt-10">
			<h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
				{t('register.title')}
			</h2>

			<div className="bg-white rounded-lg shadow-md p-6">
				{error && (
					<div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit}>
					{/* Имя и фамилия */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						<div>
							<label
								htmlFor="first_name"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								{t('register.firstNameLabel')}
							</label>
							<input
								type="text"
								id="first_name"
								name="first_name"
								value={formData.first_name}
								onChange={handleChange}
								required
								className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
							/>
						</div>

						<div>
							<label
								htmlFor="family_name"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								{t('register.lastNameLabel')}
							</label>
							<input
								type="text"
								id="family_name"
								name="family_name"
								value={formData.family_name}
								onChange={handleChange}
								required
								className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
							/>
						</div>
					</div>

					{/* Email */}
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
							className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
						/>
					</div>

					{/* Телефон */}
					<div className="mb-4">
						<label
							htmlFor="phone_number"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							{t('register.phoneNumberLabel')}
						</label>
						<input
							type="tel"
							id="phone_number"
							name="phone_number"
							value={formData.phone_number}
							onChange={handleChange}
							required
							className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
							placeholder="+7 (999) 999-99-99"
						/>
					</div>

					{/* Пароль */}
					<div className="mb-4">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							{t('register.passwordLabel')}
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
							className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
						/>
					</div>

					{/* Подтверждение пароля */}
					<div className="mb-6">
						<label
							htmlFor="confirm_password"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							{t('register.confirmPasswordLabel')}
						</label>
						<input
							type="password"
							id="confirm_password"
							name="confirm_password"
							value={formData.confirm_password}
							onChange={handleChange}
							required
							className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
						/>
					</div>

					{/* Кнопка регистрации */}
					<button
						type="submit"
						disabled={loading}
						className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition disabled:bg-indigo-300"
					>
						{loading
							? t('common.loading')
							: t('register.submitButton')}
					</button>
				</form>

				{/* Ссылка на вход */}
				<div className="mt-6 text-center">
					<p className="text-sm text-gray-600">
						{t('register.alreadyHaveAccount')}{' '}
						<Link
							to="/login"
							className="text-indigo-600 hover:underline"
						>
							{t('register.loginLink')}
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}
