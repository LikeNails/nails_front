import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { useTranslation } from 'react-i18next'
import MasterCard from './MasterCard'

const MastersPage = () => {
	const {
		masters,
		refreshMasters,
		error,
		loading,
		masterImages,
		refreshMasterImages,
		setCurrentMaster,
	} = useAppContext()

	const { t } = useTranslation()

	useEffect(() => {
		const loadMasters = async () => {
			await refreshMasters()
		}

		if (!masters || masters.length === 0) {
			loadMasters()
		}
	}, [masters, refreshMasters])

	useEffect(() => {
		const loadImages = async () => {
			await refreshMasterImages()
		}

		if (!masterImages || masterImages.length === 0) {
			loadImages()
		}
	}, [masterImages, refreshMasterImages])

	return (
		<div className="flex flex-col bg-gray-50 flex-grow">
			{/* Основной контент */}
			<main className="flex-grow container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-6 text-center">
					{t('masters.title')}
				</h1>

				{error && (
					<div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
						{error}
					</div>
				)}

				{loading ? (
					<div className="flex justify-center items-center h-64">
						<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
					</div>
				) : masters?.length === 0 ? (
					<p className="text-gray-500 text-center py-8">
						{t('masters.noMasters')}
					</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{masters.map((master) => (
							<MasterCard
								key={master._id}
								master={master}
								setCurrentMaster={setCurrentMaster}
								masterImage={masterImages.find(
									(image) => image.master === master._id,
								)}
							/>
						))}
					</div>
				)}
			</main>
		</div>
	)
}

export default MastersPage
