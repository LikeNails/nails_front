import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const CustomCalendar = ({ onDateSelect }) => {
	const { t } = useTranslation()

	const today = trimTime(new Date())

	const [selectedDate, setSelectedDate] = useState(today)
	const [currentMonth, setCurrentMonth] = useState(today.getMonth())
	const [currentYear, setCurrentYear] = useState(today.getFullYear())

	const monthNames = [
		t('months.january'),
		t('months.february'),
		t('months.march'),
		t('months.april'),
		t('months.may'),
		t('months.june'),
		t('months.july'),
		t('months.august'),
		t('months.september'),
		t('months.october'),
		t('months.november'),
		t('months.december'),
	]

	const daysOfWeek = [
		t('days.monday'),
		t('days.tuesday'),
		t('days.wednesday'),
		t('days.thursday'),
		t('days.friday'),
		t('days.saturday'),
		t('days.sunday'),
	]

	const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
	const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

	const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

	const now = trimTime(new Date())

	const days = []

	for (let i = 0; i < adjustedFirstDay; i++) {
		days.push(
			<div key={`empty-${i}`} className="aspect-square w-9 h-9"></div>,
		)
	}

	for (let i = 1; i <= daysInMonth; i++) {
		const date = trimTime(new Date(currentYear, currentMonth, i))
		const dayOfWeek = date.getDay()

		const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
		const isPast = date < now
		const isToday = isSameDay(date, now)
		const isSelected = selectedDate && isSameDay(date, selectedDate)

		const isDisabled = isWeekend || isPast

		days.push(
			<button
				type="button"
				key={i}
				onClick={() => {
					if (!isDisabled) {
						const finalDate = isToday ? now : date
						setSelectedDate(finalDate)
						onDateSelect(finalDate)
					}
				}}
				disabled={isDisabled}
				className={`
          w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium
          ${
				isSelected
					? 'bg-indigo-600 text-white'
					: isToday
					? 'bg-indigo-100 text-indigo-800'
					: isWeekend
					? 'text-gray-400 bg-gray-50 cursor-not-allowed'
					: isPast
					? 'text-gray-300 cursor-not-allowed'
					: 'hover:bg-indigo-50 text-gray-700'
			}
        `}
			>
				{i}
			</button>,
		)
	}

	const nextMonth = () => {
		if (currentMonth === 11) {
			setCurrentMonth(0)
			setCurrentYear(currentYear + 1)
		} else {
			setCurrentMonth(currentMonth + 1)
		}
	}

	const prevMonth = () => {
		if (currentMonth === 0) {
			setCurrentMonth(11)
			setCurrentYear(currentYear - 1)
		} else {
			setCurrentMonth(currentMonth - 1)
		}
	}

	return (
		<div className="calendar bg-white shadow rounded-lg p-4">
			{/* Заголовок с месяцем и навигацией */}
			<div className="flex items-center justify-between mb-4">
				<button
					type="button"
					onClick={prevMonth}
					className="text-indigo-600 font-bold text-xl w-8 h-8 flex items-center justify-center hover:bg-indigo-50 rounded-full transition"
				>
					‹
				</button>
				<h3 className="text-lg font-semibold text-gray-800">
					{monthNames[currentMonth]} {currentYear}
				</h3>
				<button
					type="button"
					onClick={nextMonth}
					className="text-indigo-600 font-bold text-xl w-8 h-8 flex items-center justify-center hover:bg-indigo-50 rounded-full transition"
				>
					›
				</button>
			</div>

			{/* Названия дней недели */}
			<div className="grid grid-cols-7 gap-1 text-xs text-gray-500 mb-2">
				{daysOfWeek.map((day, idx) => (
					<div key={`dow-${idx}`}>{day}</div>
				))}
			</div>

			{/* Календарь с днями */}
			<div className="grid grid-cols-7 gap-1">{days}</div>
		</div>
	)
}

// Убирает время у даты
function trimTime(date) {
	const d = new Date(date)
	d.setHours(0, 0, 0, 0)
	return d
}

// Сравнивает две даты по дням
function isSameDay(dateA, dateB) {
	return (
		dateA &&
		dateB &&
		dateA.getFullYear() === dateB.getFullYear() &&
		dateA.getMonth() === dateB.getMonth() &&
		dateA.getDate() === dateB.getDate()
	)
}
