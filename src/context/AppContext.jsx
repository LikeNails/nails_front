import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Импортируем наш api
import { api } from '../api/api'

// Создаем контекст
const AppContext = createContext()

// Хук для использования контекста
export const useAppContext = () => useContext(AppContext)

// Компонент провайдера контекста
export const AppProvider = ({ children }) => {
	// Состояние пользователя
	const [user, setUser] = useState(null)
	const [masters, setMasters] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [availableSlots, setAvailableSlots] = useState([])
	const [timeslots, setTimeslots] = useState([])

	// Дополнительные состояния
	const [currentMasterServices, setCurrentMasterServices] = useState([])

	const navigate = useNavigate()

	// Перехватчик API-запросов — автообновление токена
	const privateApiRequest = async (apiCall, ...args) => {
		let result = await apiCall(...args)

		if (
			result.error &&
			(result.error.includes('jwt expired') ||
				result.error.includes('invalid token'))
		) {
			const newToken = await refreshAccessToken()
			if (newToken) {
				result = await apiCall(...args)
			}
		}

		if (!result.success) {
			setError(result.error)
		}

		return result
	}

	// Приватный маршрут

	// Метод обновления accessToken через refreshToken
	const refreshAccessToken = async () => {
		try {
			const refreshToken = localStorage.getItem('refreshToken')
			if (!refreshToken) return null

			const response = await axios.post(
				'http://127.0.0.1:5000/api/v1/auth/refresh',
				{ refreshToken },
			)

			const { accessToken, refreshToken: newRefreshToken } = response.data

			localStorage.setItem('accessToken', accessToken)
			localStorage.setItem('refreshToken', newRefreshToken)

			return accessToken
		} catch (err) {
			logout()
			navigate('/login', { replace: true })
			return null
		}
	}

	// Проверка токена и загрузка данных пользователя + мастеров
	useEffect(() => {
		const initApp = async () => {
			const token = localStorage.getItem('accessToken')

			if (token) {
				try {
					// Получаем данные пользователя
					const userResult = await api.getCurrentUser()
					if (userResult.success) {
						setUser(userResult.user)
					}

					// Получаем список мастеров
					const mastersResult = await api.getMasters()
					if (mastersResult && mastersResult.success) {
						// Убедимся, что masters — это массив
						const mastersArray = mastersResult.data.masters || []

						if (!Array.isArray(mastersArray)) {
							console.error(
								'Ошибка: мастера должны быть массивом',
							)
							setError(
								'Не получилось получить информацию о мастерах',
							)
						} else {
							setMasters(mastersArray)
						}
					}
				} catch (err) {
					console.error('Ошибка инициализации:', err.message)
					setError('Не удалось загрузить данные приложения')
				}
			}

			setLoading(false)
		}

		initApp()
	}, [])

	// Логин
	const login = async (email, password) => {
		setLoading(true)
		setError(null)
		try {
			const result = await api.login(email, password)
			if (result.success) {
				setUser(result.user)
				navigate('/')
			} else {
				setError(result.error || 'Ошибка входа')
			}
		} catch (err) {
			setError(err.message || 'Произошла ошибка')
		} finally {
			setLoading(false)
		}
	}

	// Регистрация
	const register = async (userData) => {
		setLoading(true)
		setError(null)
		try {
			const result = await api.register(userData)
			if (result.success) {
				setUser(result.user)
				navigate('/')
			} else {
				setError(result.error || 'Ошибка регистрации')
			}
		} catch (err) {
			setError(err.message || 'Произошла ошибка')
		} finally {
			setLoading(false)
		}
	}

	// Выход
	const logout = async () => {
		try {
			await api.logout()
		} finally {
			setUser(null)
			setMasters([])
			setCurrentMasterServices([])
			navigate('/login')
		}
	}

	// Обновление списка мастеров
	const refreshMasters = async () => {
		try {
			const result = await api.getMasters()
			if (result && result.success) {
				const mastersArray = result.data

				if (!Array.isArray(mastersArray)) {
					setError('Не получилось загрузить информацию о мастерах')
					return
				}
				setMasters(mastersArray)
			} else {
				setError(result.error)
			}
		} catch (error) {
			setError(error)
		}
	}

	// Получение услуг мастера
	const getMasterServices = async (masterId) => {
		setLoading(true)
		setError(null)

		try {
			const result = await api.getMasterServices(masterId)
			if (result.success) {
				const { servicePrices, services } = result.data

				const mergedServices = servicePrices.map((priceObj) => {
					const service = services.find((s) =>
						priceObj.service.includes(s._id),
					)

					return {
						_id: priceObj._id,
						master: priceObj.master,
						serviceId: service?._id || '',
						name: service?.name || 'Неизвестная услуга',
						price: priceObj.price,
					}
				})

				setCurrentMasterServices(mergedServices)
				return mergedServices
			} else {
				console.log(result.error)
				setError('Не получилось найти расписание мастера')
				return []
			}
		} catch (err) {
			setError(err.message || 'Ошибка при получении услуг')
			return []
		} finally {
			setLoading(false)
		}
	}

	const getMasterFreeSlotsByDate = async (masterId, date) => {
		const day = new Date(date).getDate()
		const month = new Date(date).getMonth() + 1
		const year = new Date(date).getFullYear()

		const result = await api.getMasterFreeSlots(masterId, day, month, year)
		if (result.success) {
			setAvailableSlots(result.data.timeslots)
			return result.data.timeslots
		} else {
			console.log(result.error)
			if (
				result.error ==
				'Invalid or expired token TokenExpiredError: jwt expired'
			) {
				setError('Требуется заново авторизоватья, время сессии истекло')
			} else {
				setError('Не получилось найти информацию')
			}

			return []
		}
	}

	// Получение свободных слотов мастера
	const getMasterFreeSlots = async (
		masterId,
		dayNumber,
		monthNumber,
		yearNumber,
	) => {
		try {
			const result = await api.getMasterFreeSlots(
				masterId,
				dayNumber,
				monthNumber,
				yearNumber,
			)
			return result
		} catch (err) {
			setError(err.message || 'Не удалось получить доступные слоты')
			return { success: false, error: err.message }
		}
	}

	// Запись к мастеру
	const bookToMaster = async (masterId, timeslotId, selectedDate) => {
		setLoading(true)
		setError(null)

		try {
			const day = new Date(selectedDate).getDate()
			const month = new Date(selectedDate).getMonth() + 1
			const year = new Date(selectedDate).getFullYear()

			const slotsResult = await privateApiRequest(
				getMasterFreeSlots,
				masterId,
				day,
				month,
				year,
			)

			if (!slotsResult.success) {
				throw new Error(
					slotsResult.error ||
						'Не удалось получить данные для записи',
				)
			}

			const { scheduleId, monthId } = slotsResult.data
			if (!scheduleId || !monthId) {
				throw new Error('Не найдены scheduleId или monthId')
			}

			const bookingData = {
				scheduleId,
				timeslotId,
				monthId,
				userId: user._id,
				day: day,
			}

			const response = await privateApiRequest(
				api.bookAppointment,
				bookingData,
			)

			if (response.success) {
				setError(null)
				return response
			} else {
				setError(response.error)
				return response
			}
		} catch (err) {
			setError(err.message || 'Ошибка при записи к мастеру')
			return { success: false, error: err.message }
		} finally {
			setLoading(false)
		}
	}

	return (
		<AppContext.Provider
			value={{
				user,
				loading,
				error,
				masters,
				availableSlots,
				timeslots,

				// Actions
				setAvailableSlots,
				getMasterFreeSlotsByDate,
				setError,
				login,
				register,
				logout,
				refreshMasters,
				getMasterServices,
				getMasterFreeSlots,
				bookToMaster,
				setTimeslots,

				// Данные
				currentMasterServices,
			}}
		>
			{!loading && children}
		</AppContext.Provider>
	)
}
