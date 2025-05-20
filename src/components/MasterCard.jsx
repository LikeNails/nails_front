// src/components/pages/MastersPage/MasterCard.tsx

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import './MasterCard.css'

const MasterCard = ({ master }) => {
	const { getMasterServices } = useAppContext()
	const [isServicesLoading, setIsServicesLoading] = useState(false)

	const handleServiceClick = async () => {
		setIsServicesLoading(true)
		await getMasterServices(master._id)
		setIsServicesLoading(false)
	}

	return (
		<div className="master-card bg-white shadow-lg rounded-xl overflow-hidden transition transform hover:scale-105 hover:shadow-xl duration-200">
			{/* Заглушка для изображения */}
			<div className="h-48 bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
				<img
					src={`https://picsum.photos/seed/ ${master._id}/400/200`}
					alt={`${master.first_name} ${master.family_name}`}
					className="w-full h-full object-cover"
				/>
			</div>

			<div className="p-6">
				<h3 className="text-xl font-semibold text-gray-900">
					{master.first_name} {master.family_name}
				</h3>

				{/* Услуги мастера */}

				{/* Кнопка "Посмотреть все услуги" */}
				<Link
					to={`/services?masterId=${master._id}`}
					onClick={handleServiceClick}
				>
					<button
						type="button"
						className="mt-4 w-full py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition"
					>
						{isServicesLoading ? 'Загрузка...' : 'Все услуги'}
					</button>
				</Link>

				{/* Кнопка "Записаться" */}
				<Link to={`/booking/${master._id}`}>
					<button className="mt-3 w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
						Записаться
					</button>
				</Link>
			</div>
		</div>
	)
}

export default MasterCard
