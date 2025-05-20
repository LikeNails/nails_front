import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'

import { useAppContext } from '@/context/AppContext'
export const LoginPage = () => {
	const { login, error, setError, loading } = useAppContext()
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	useEffect(() => {
		setError(null)
	}, [])

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { email, password } = formData
		login(email, password)
	}

	return (
		<div className="max-w-md mx-auto">
			<h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
				Войдите в свой аккаунт
			</h2>

			<div className="bg-white rounded-lg shadow-md p-6">
				{error && (
					<div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit}>
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

					<div className="mb-6">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Пароль
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

					<button
						type="submit"
						disabled={loading}
						className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition disabled:bg-indigo-300"
					>
						{loading ? 'Вход...' : 'Войти'}
					</button>
				</form>

				<div className="mt-6 text-center">
					<p className="text-sm text-gray-600">
						Нет аккаунта?{' '}
						<Link
							to="/register"
							className="text-indigo-600 hover:underline"
						>
							Зарегистрируйтесь
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}
