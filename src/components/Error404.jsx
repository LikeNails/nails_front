import React from 'react'

export const Error404 = () => {
	return (
		<div className="text-center py-12">
			<h1 className="text-5xl font-bold text-gray-900 mb-4">404</h1>
			<h2 className="text-2xl font-semibold text-gray-700 mb-6">
				Страница не найдена
			</h2>
			<p className="text-gray-600 mb-8 max-w-md mx-auto">
				Страница, которую вы ищете, не существует или была перемещена.
			</p>
			<Link
				to="/"
				className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
			>
				Вернуться на главную
			</Link>
		</div>
	)
}
