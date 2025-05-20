// src/components/pages/BookingPage/BookingPage.tsx

import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { CustomCalendar } from './CustomCalendar'
import './BookingPage.css'

export const BookingPage = () => {
	const { masterId } = useParams()
	const navigate = useNavigate()

	const {
		masters,
		bookToMaster,
		getMasterFreeSlotsByDate,
		loading,
		error,
		loadingSlots,
		availableSlots,
		setAvailableSlots,
		user,
	} = useAppContext()

	const [selectedDate, setSelectedDate] = useState('')
	const [selectedSlot, setSelectedSlot] = useState(null)
	const [successMessage, setSuccessMessage] = useState('')

	const master = masters.find((m) => m._id === masterId)

	if (!user) {
		return <Navigate to="/login" replace />
	}
	// Редирект, если masterId не передан
	useEffect(() => {
		if (!masterId) {
			navigate('/masters', { replace: true })
		}
	}, [masterId, navigate])

	// Автоматическая подгрузка слотов при mount, если selectedDate уже есть
	useEffect(() => {
		if (!selectedDate || !masterId) return
		console.log(`selected date ${selectedDate}`)
		const loadSlots = async () => {
			const slots = await getMasterFreeSlotsByDate(masterId, selectedDate)
			setAvailableSlots(slots)
		}
		loadSlots()
		console.log(availableSlots)
	}, [selectedDate, masterId])

	const handleDateSelect = (date) => {
		setSelectedDate(date.toISOString().split('T')[0])
	}

	const handleSlotSelect = (slot) => {
		setSelectedSlot(slot)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!selectedDate || !selectedSlot) {
			alert('Выберите дату и время')
			return
		}
		console.log(`selected date in handleSubmit ${selectedDate}`)
		const result = await bookToMaster(
			masterId,
			selectedSlot._id,
			selectedDate,
		)

		if (result.success) {
			setSuccessMessage('Вы успешно записались!')
			setTimeout(() => {
				setSuccessMessage('')
				setSelectedSlot(null)
				setSelectedDate('')
			}, 3000)
		} else {
			alert(`Ошибка: ${result.error}`)
		}
	}

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-indigo-600 rounded-full"></div>
			</div>
		)
	}

	if (!master) {
		return (
			<div className="text-center py-12">
				<h2>Мастер не найден</h2>
				<button
					type="button"
					onClick={() => window.history.back()}
					className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
				>
					← Назад
				</button>
			</div>
		)
	}

	return (
		<div className="booking-page container mx-auto px-4 py-8 max-w-4xl">
			<h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
				Запись к мастеру: {master.first_name} {master.family_name}
			</h2>

			{error && (
				<div className="bg-red-100 text-red-700 p-4 rounded-md mb-6 text-center">
					{error}
				</div>
			)}

			{successMessage && (
				<div className="bg-green-100 text-green-700 p-4 rounded-md mb-6 text-center">
					{successMessage}
				</div>
			)}

			<form
				onSubmit={handleSubmit}
				className="bg-white rounded-lg shadow-md p-6"
			>
				{/* Календарь */}
				<div className="mb-6">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Выберите дату
					</label>
					<CustomCalendar onDateSelect={handleDateSelect} />
				</div>

				{/* Временные слоты */}
				{selectedDate && (
					<div className="mb-6">
						<h3 className="font-medium text-gray-700 mb-2">
							Доступное время на{' '}
							{new Date(selectedDate).toLocaleDateString()}
						</h3>
						{loadingSlots ? (
							<div className="flex justify-center py-4">
								<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
							</div>
						) : availableSlots.length === 0 ? (
							<p className="text-gray-500 py-4 text-center">
								Нет доступных слотов на эту дату
							</p>
						) : (
							<div className="grid grid-cols-3 md:grid-cols-5 gap-2">
								{availableSlots.map((slot) => (
									<button
										key={slot.order}
										type="button"
										onClick={() => handleSlotSelect(slot)}
										className={`py-2 px-3 rounded-md border text-center ${
											selectedSlot?._id === slot._id
												? 'bg-indigo-600 text-white border-indigo-600'
												: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
										}`}
									>
										{slot.start} - {slot.end}
									</button>
								))}
							</div>
						)}
					</div>
				)}

				{/* Кнопка "Записаться" */}
				<button
					type="submit"
					disabled={!selectedDate || !selectedSlot || loadingSlots}
					className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition disabled:bg-indigo-300 disabled:opacity-50"
				>
					Записаться
				</button>
			</form>
		</div>
	)
}
