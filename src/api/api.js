import axios from 'axios'

// Базовая конфигурация для axios
const apiClient = axios.create({
	baseURL: 'http://127.0.0.1:5000/api/v1',
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 10000,
})

let navigateFunction = null

export const setNavigate = (navigate) => {
	navigateFunction = navigate
}

const jwtDecode = (token) => {
	const base64Url = token.split('.')[1]
	const base64 = base64Url.replace(/-/g, '_').replace(/_/g, '/')
	const jsonPayload = decodeURIComponent(
		atob(base64)
			.split('')
			.map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
			.join(''),
	)
	return JSON.parse(jsonPayload)
}

// Проверка истечения срока действия токена
const isTokenExpired = (token) => {
	try {
		const decoded = jwtDecode(token)
		return decoded.exp < Date.now() / 1000
	} catch (error) {
		return true
	}
}

apiClient.interceptors.request.use((config) => {
	const token = localStorage.getItem('accessToken')
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`
	}
	return config
})

apiClient.interceptors.request.use(
	async (config) => {
		let accessToken = localStorage.getItem('accessToken')

		if (accessToken && isTokenExpired(accessToken)) {
			try {
				const refreshToken = localStorage.getItem('refreshToken')
				const response = await axios.post('/refresh', {
					refresh_token: refreshToken,
				})

				accessToken = response.data.access_token
				localStorage.setItem('accessToken', accessToken)

				config.headers['Authorization'] = `Bearer ${accessToken}`
			} catch (error) {
				localStorage.removeItem('accessToken')
				localStorage.removeItem('refreshToken')

				// Используем navigate вместо window.location.href
				if (navigateFunction) {
					navigateFunction('/login', {
						state: {
							message: 'Сессия истекла. Пожалуйста, войдите снова.',
							type: 'error',
						},
					})
				}

				return Promise.reject(error)
			}
		} else if (accessToken) {
			config.headers['Authorization'] = `Bearer ${accessToken}`
		}

		return config
	},
	(error) => {
		return Promise.reject(error)
	},
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

	getMasterImages: async () => {
		try {
			const response = await apiClient.post('/master-image/get')
			return { success: true, data: response.data.models }
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.message || 'Ошибка загрузки изображений'
			}
		}
	},

	getOffers: async () => {
		try {
			const response = await apiClient.post('/offer/get')
			return { success: true, data: response.data.models }
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.message || 'Ошибка загрузки изображений'
			}
		}
	},

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
			const response = await apiClient.post('/login', { email, password });
			const { accessToken, refreshToken } = response.data;

			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);

			// Запрос на /me
			const meResponse = await apiClient.post('/me', {}, {
			});

			const user = meResponse.data;

			return { success: true, data: { user, accessToken, refreshToken } };

		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.message || 'Ошибка входа',
			};
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