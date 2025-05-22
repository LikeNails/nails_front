import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { useTranslation } from 'react-i18next'

export const ServicesPage = () => {
	const navigate = useNavigate()
	const { masterId } = useParams()
	const { currentMasterServices, getMasterServices, loading, error } =
		useAppContext()

	const { t } = useTranslation()

	useEffect(() => {
		if (masterId) {
			getMasterServices(masterId)
		}
	}, [masterId])

	return (
		<div className="services-page container mx-auto px-4 py-8">
			<h2 className="text-3xl font-bold mb-6 text-center">
				{t('services.title')}
			</h2>

			{loading ? (
				<div className="flex justify-center items-center py-12">
					<div className="animate-spin h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
				</div>
			) : error ? (
				<div className="bg-red-100 text-red-700 p-4 rounded-md mb-6 text-center">
					{error}
				</div>
			) : currentMasterServices.length === 0 ? (
				<p className="text-gray-500 text-center py-8">
					{t('services.noServices')}
				</p>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{currentMasterServices.map((service) => (
						<div
							key={service._id}
							className="bg-white shadow-md rounded-lg p-6"
						>
							<h3 className="text-xl font-semibold mb-2">
								{service.name}
							</h3>
							<p className="text-gray-600">
								{t('services.price')}: {service.price} ₽
							</p>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
