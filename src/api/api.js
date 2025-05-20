import axios from 'axios'

// Базовая конфигурация для axios
const apiClient = axios.create({
	baseURL: 'http://127.0.0.1:5000/api/v1',
	headers: {
		'Content-Type': 'application/json',
	},
})

apiClient.interceptors.request.use((config) => {
	const token = localStorage.getItem('accessToken')
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`
	}
	return config
})

// Интерсептор запросов — добавляет токен, если он есть
apiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true
			const newToken = await refreshTokens()
			if (newToken) {
				originalRequest.headers['Authorization'] = `Bearer ${newToken}`
				return axios(originalRequest)
			}
		}
		return Promise.reject(error)
	}
)

// Парсинг JWT токена
function parseJwt(token) {
	try {
		const base64Url = token.split('.')[1]
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
		const jsonPayload = decodeURIComponent(
			window.atob(base64)
				.split('')
				.map(function (c) {
					return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
				})
				.join('')
		)
		return JSON.parse(jsonPayload)
	} catch (e) {
		return null
	}
}

export const api = {
	// Получение данных текущего пользователя
	getCurrentUser: async () => {
		try {
			const response = await apiClient.post('/me')
			return { success: true, user: response.data }
		} catch (error) {
			return {
				success: false,
				error:
					error.response?.data?.message || 'Ошибка получения данных пользователя',
			}
		}
	},

	// Регистрация пользователя
	register: async (userData) => {
		try {
			const response = await apiClient.post('/register', userData)
			const { accessToken, refreshToken } = response.data

			localStorage.setItem('accessToken', accessToken)
			localStorage.setItem('refreshToken', refreshToken)

			const user = parseJwt(accessToken)

			return { success: true, user }
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.message || 'Ошибка регистрации',
			}
		}
	},

	// Вход пользователя
	login: async (email, password) => {
		try {
			const response = await apiClient.post('/login', { email, password })
			const { accessToken, refreshToken } = response.data
			console.log(accessToken)

			localStorage.setItem('accessToken', accessToken)
			localStorage.setItem('refreshToken', refreshToken)

			const meResponse = await axios.post(
				'http://127.0.0.1:5000/api/v1/me', {},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				}
			)

			const user = meResponse.data
			console.log(user)
			return { success: true, data: user }
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.message || 'Ошибка входа',
			}
		}
	},

	// Выход пользователя
	logout: async () => {
		try {
			await apiClient.post('/logout')
		} finally {
			localStorage.removeItem('accessToken')
			localStorage.removeItem('refreshToken')
		}
	},

	// Получение всех мастеров
	getMasters: async () => {
		try {
			const response = await apiClient.post('/master/get-masters')
			console.log('error response' + response.data.masters)
			if (response.data.message) {
				throw new Error(response.data.message)
			}
			return { success: true, data: response.data.masters }
		} catch (error) {
			return {
				success: false,
				error: error || 'Не удалось загрузить список мастеров',
			}
		}
	},

	getMasterFreeSlotsByDate: async (masterId, date) => {
		const day = new Date(date).getDate()
		const month = new Date(date).getMonth() + 1
		console.log(month)
		const year = new Date(date).getFullYear()

		try {
			const response = await apiClient.post('/master/get-master-free-slots', {
				masterId,
				dayNumber: day,
				monthNumber: month,
				yearNumber: year,
			})
			return { success: true, data: response.data }
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.message || 'Не удалось получить доступные слоты',
			}
		}
	},

	// Получение свободных слотов мастера
	getMasterFreeSlots: async (masterId, dayNumber, monthNumber, yearNumber) => {
		try {
			const response = await apiClient.post('/master/get-master-free-slots', {

				masterId: masterId,
				dayNumber: dayNumber,
				monthNumber: monthNumber,
				yearNumber: yearNumber

			})
			return { success: true, data: response.data }
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.message || 'Не удалось получить доступные слоты',
			}
		}
	},

	// Получение услуг мастера
	getMasterServices: async (masterId) => {
		try {
			const response = await apiClient.post('/master/get-master-services', {
				masterId,
			})
			return { success: true, data: response.data }
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.message || 'Не удалось получить услуги мастера',
			}
		}
	},

	refreshTokens: async () => {
		const refreshToken = localStorage.getItem('refreshToken')
		if (!refreshToken) return null

		try {
			const response = await axios.post('http://127.0.0.1:5000/api/v1/refresh', {
				refreshToken,
			})

			const { accessToken, refreshToken: newRefreshToken } = response.data
			localStorage.setItem('accessToken', accessToken)
			localStorage.setItem('refreshToken', newRefreshToken)

			return accessToken
		} catch (err) {
			return null
		}
	},

	// Запись на прием
	bookAppointment: async (bookingData) => {
		try {
			const response = await apiClient.post('/offer/add', bookingData)
			return { success: true, data: response.data }
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.message || 'Не удалось создать запись',
			}
		}
	},
}