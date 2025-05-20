import React from 'react'
import { Link } from 'react-router'
export const HomePage = () => {
	return (
		<div className="text-center">
			<h1 className="text-4xl font-bold text-gray-900 mb-6">
				Добро пожаловать в{' '}
				<span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
					LikeNails
				</span>
			</h1>
			<p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
				Найдите лучшего мастера и запишитесь на прием удобным для вас
				способом. Мы предлагаем широкий выбор специалистов в различных
				сферах услуг.
			</p>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div className="bg-white p-6 rounded-lg shadow-md">
					<div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 text-indigo-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
					</div>
					<h3 className="text-xl font-semibold mb-2">
						Выбор мастера
					</h3>
					<p className="text-gray-600">
						Просмотрите профили мастеров, ознакомьтесь с их услугами
						и отзывами клиентов.
					</p>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-md">
					<div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 text-indigo-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
					</div>
					<h3 className="text-xl font-semibold mb-2">
						Удобное расписание
					</h3>
					<p className="text-gray-600">
						Выбирайте подходящее время для записи на прием в любое
						удобное для вас время.
					</p>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-md">
					<div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 text-indigo-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<h3 className="text-xl font-semibold mb-2">
						Контроль бюджета
					</h3>
					<p className="text-gray-600">
						Сравнивайте цены на услуги разных мастеров и выбирайте
						наиболее выгодные варианты.
					</p>
				</div>
			</div>

			<div className="mt-12">
				<Link
					to="/masters"
					className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-md text-lg font-medium hover:bg-indigo-700 transition"
				>
					Найти мастера
				</Link>
			</div>
		</div>
	)
}
