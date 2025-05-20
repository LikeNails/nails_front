// src/components/booking/CustomCalendar.tsx
import './Calendar.css'
import React, { useState } from 'react'

export const CustomCalendar = ({ onDateSelect }) => {
	const [selectedDate, setSelectedDate] = useState(new Date())

	const daysInMonth = new Date(
		selectedDate.getFullYear(),
		selectedDate.getMonth() + 1,
		0,
	).getDate()

	const firstDayOfMonth = new Date(
		selectedDate.getFullYear(),
		selectedDate.getMonth(),
		1,
	).getDay()

	const currentMonth = selectedDate.getMonth()
	const currentYear = selectedDate.getFullYear()

	const days = []
	for (let i = 0; i < firstDayOfMonth; i++) {
		days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
	}

	for (let i = 1; i <= daysInMonth; i++) {
		const date = new Date(currentYear, currentMonth, i + 1)
		const isPast = date < new Date()
		const today = date.toDateString() === new Date().toDateString()

		days.push(
			<button
				type="button"
				key={i}
				onClick={() => {
					onDateSelect(date)
					setSelectedDate(date)
				}}
				disabled={isPast}
				className={`calendar-day ${today ? 'today' : ''} ${
					isPast ? 'past' : ''
				}`}
			>
				<span>{i}</span>
			</button>,
		)
	}

	const monthNames = [
		'Январь',
		'Февраль',
		'Март',
		'Апрель',
		'Май',
		'Июнь',
		'Июль',
		'Август',
		'Сентябрь',
		'Октябрь',
		'Ноябрь',
		'Декабрь',
	]

	return (
		<div className="calendar">
			<div className="calendar-header">
				<h3>
					{monthNames[selectedDate.getMonth()]}{' '}
					{selectedDate.getFullYear()}
				</h3>
			</div>

			<div className="calendar-days">
				<div>Пн</div>
				<div>Вт</div>
				<div>Ср</div>
				<div>Чт</div>
				<div>Пт</div>
				<div>Сб</div>
				<div>Вс</div>
				{days}
			</div>
		</div>
	)
}
