import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import MasterCard from '../MasterCard'

// Хелпер для сравнения дат по дням
function isSameDay(dateA, dateB) {
	return (
		dateA.getFullYear() === dateB.getFullYear() &&
		dateA.getMonth() === dateB.getMonth() &&
		dateA.getDate() === dateB.getDate()
	)
}

const UserDashboard = () => {
	const {
		user,
		masters,
		masterImages,
		getOffers,
		refreshMasters,
		refreshMasterImages,
		loading: appLoading,
		error: appError,
	} = useAppContext()

	const [orders, setOrders] = useState([])
	const [userMasters, setUserMasters] = useState([])
	const [activeOrders, setActiveOrders] = useState([])
	const [pastOrders, setPastOrders] = useState([])
	const [upcomingNotifications, setUpcomingNotifications] = useState([])
	const [hasAppointmentToday, setHasAppointmentToday] = useState(false)
	const [loading, setLoading] = useState(true)

	// Загружаем мастеров и изображения при монтировании
	useEffect(() => {
		const loadMasters = async () => {
			await refreshMasters()
			await refreshMasterImages()
		}

		loadMasters()
	}, [])

	// Получаем данные заказов и разбиваем их на категории
	useEffect(() => {
		const fetchDashboardData = async () => {
			setLoading(true)

			const ordersResult = await getOffers()
			if (!ordersResult?.success) {
				setLoading(false)
				return
			}

			const ordersData = ordersResult.data || []
			setOrders(ordersData)

			const masterIds = [
				...new Set(ordersData.map((order) => order.master)),
			].filter(Boolean)
			const matchedMasters = masters.filter((m) =>
				masterIds.includes(m._id),
			)
			setUserMasters(matchedMasters)

			const today = new Date()
			const currentTimestamp = today.getTime()

			const active = []
			const past = []
			const notifications = []

			ordersData.forEach((order) => {
				// Парсим время начала
				const timeParts = order.time?.split('-')[0]?.split(':') || [
					'00',
					'00',
				]
				const [hours, minutes] = timeParts.map(Number)

				// Используем yearNumber, monthNumber и day из заказа
				const orderDate = new Date(
					parseInt(order.yearNumber) || today.getFullYear(),
					parseInt(order.monthNumber) - 1 || 0,
					parseInt(order.day) || 1,
					hours,
					minutes,
					0,
					0,
				)

				const orderTimestamp = orderDate.getTime()
				const diffInMs = orderTimestamp - currentTimestamp
				const diffInHours = diffInMs / (1000 * 60 * 60)

				if (diffInMs > 0 && diffInHours <= 1) {
					notifications.push({ ...order, orderDate })
				}

				if (orderTimestamp >= currentTimestamp) {
					active.push(order)
				} else {
					past.push(order)
				}
			})

			// Проверяем, есть ли сегодня запись
			const todayDate = new Date()
			const hasToday = active.some((order) => {
				const orderDate = new Date(
					parseInt(order.yearNumber),
					parseInt(order.monthNumber) - 1,
					parseInt(order.day),
				)
				return isSameDay(orderDate, todayDate)
			})
			setHasAppointmentToday(hasToday)

			setActiveOrders(active)
			setPastOrders(past)
			setUpcomingNotifications(notifications)
			setLoading(false)
		}

		fetchDashboardData()
	}, [getOffers, masters])

	if (!user) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p>Пожалуйста, войдите в аккаунт</p>
			</div>
		)
	}

	if (appLoading || loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
			</div>
		)
	}

	if (appError) {
		return (
			<div className="bg-red-100 text-red-700 p-4 rounded-md m-8">
				{appError}
			</div>
		)
	}

	return (
		<div className="bg-gray-50 min-h-screen">
			<main className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-6 text-center">
					Личный кабинет
				</h1>

				{/* Уведомление о том, что сегодня есть запись */}
				{hasAppointmentToday && upcomingNotifications.length === 0 && (
					<div className="mb-6">
						<div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md shadow-sm">
							<p className="font-medium">
								📅 Сегодня у вас запланирована запись.
							</p>
							<p className="text-sm mt-1">
								Проверьте раздел «Активные записи».
							</p>
						</div>
					</div>
				)}

				{/* Уведомления о ближайших записях */}
				{upcomingNotifications.length > 0 && (
					<div className="mb-6">
						{upcomingNotifications.map((notification) => {
							const timeParts = notification.time
								.split('-')[0]
								.split(':')
							const [hours, minutes] = timeParts.map(Number)
							const orderDate = new Date(
								notification.yearNumber,
								notification.monthNumber - 1,
								notification.day,
								hours,
								minutes,
							)
							const now = new Date()
							const diffInMs = orderDate - now
							const diffInMinutes = Math.floor(
								diffInMs / (1000 * 60),
							)

							return (
								<div
									key={notification._id}
									className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-sm"
								>
									<p className="font-medium">
										⚠️ До вашей записи осталось{' '}
										<strong>{diffInMinutes} мин</strong>
									</p>
									<p>
										{notification.day}.
										{notification.monthNumber}.
										{notification.yearNumber},{' '}
										{notification.time}
									</p>
								</div>
							)
						})}
					</div>
				)}

				{/* Информация о пользователе */}
				<section className="bg-white shadow rounded-lg p-6 mb-8">
					<h2 className="text-xl font-semibold mb-4">Ваш профиль</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<p>
							<strong>Имя:</strong>{' '}
							{user.first_name || 'Не указано'}
						</p>
						<p>
							<strong>Фамилия:</strong>{' '}
							{user.family_name || 'Не указано'}
						</p>
						<p>
							<strong>Email:</strong> {user.email}
						</p>
						<p>
							<strong>Телефон:</strong>{' '}
							{user.phone_number || 'Не указано'}
						</p>
					</div>
				</section>

				{/* Активные записи */}
				<section className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">
						Активные записи
					</h2>
					{activeOrders.length === 0 ? (
						<p className="text-gray-500 italic">
							Нет активных записей
						</p>
					) : (
						<ul className="space-y-4">
							{activeOrders.map((order) => {
								const master = masters.find(
									(m) => m._id === order?.master,
								)
								return (
									<li
										key={order._id}
										className="bg-white shadow rounded-lg p-4"
									>
										<div className="flex justify-between">
											<div>
												<p>
													<strong>Мастер:</strong>{' '}
													{master?.first_name ||
														'Неизвестен'}
												</p>
												<p>
													<strong>Дата:</strong>{' '}
													{order.day}-{' '}
													{order.monthNumber}-{' '}
													{order.yearNumber}
												</p>
												<p>
													<strong>Время:</strong>{' '}
													{order.time}
												</p>
											</div>
										</div>
									</li>
								)
							})}
						</ul>
					)}
				</section>

				{/* Архивные записи */}
				<section className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">
						Прошедшие записи
					</h2>
					{pastOrders.length === 0 ? (
						<p className="text-gray-500 italic">
							Нет завершённых записей
						</p>
					) : (
						<ul className="space-y-4">
							{pastOrders.map((order) => {
								const master = masters.find(
									(m) => m._id === order?.master,
								)
								return (
									<li
										key={order._id}
										className="bg-white shadow rounded-lg p-4"
									>
										<div className="flex justify-between">
											<div>
												<p>
													<strong>Мастер:</strong>{' '}
													{master?.first_name ||
														'Неизвестен'}
												</p>
												<p>
													<strong>Дата:</strong>{' '}
													{order.day}-{' '}
													{order.monthNumber}-{' '}
													{order.yearNumber}
												</p>
												<p>
													<strong>Время:</strong>{' '}
													{order.time}
												</p>
											</div>
										</div>
									</li>
								)
							})}
						</ul>
					)}
				</section>

				{/* Мастера, у которых были записи */}
				<section>
					<h2 className="text-2xl font-semibold mb-4">
						Избранные мастера
					</h2>
					{userMasters.length === 0 ? (
						<p className="text-gray-500 italic">
							Вы еще не делали заказов или мастера больше
							недоступны
						</p>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{userMasters.map((master) => (
								<MasterCard
									key={master._id}
									master={master}
									masterImage={masterImages.find(
										(img) => img.master === master._id,
									)}
								/>
							))}
						</div>
					)}
				</section>
			</main>
		</div>
	)
}

export default UserDashboard
