// App.tsx

import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import MastersPage from './components/MastersPage'
import { ServicesPage } from './components/ServicesPage'
import { BookingPage } from './components/BookingPage'
import { LoginPage } from './components/LoginPage'
import { RegisterPage } from './components/RegisterPage'
import { Navbar } from './components/Navigation/Navbar'
import { Footer } from './components/Footer/Footer'
import { HomePage } from './components/HomePage'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastProvider } from './components/ToastProvider'
import { setNavigate } from './api/api'
import UserDashboard from './components/UserDashboard/UserDashboard'
import { useNavigate } from 'react-router-dom'

const AppWithRouter = () => {
	const navigate = useNavigate()

	useEffect(() => {
		setNavigate(navigate)
	}, [navigate])

	return (
		<ToastProvider>
			<AppProvider>
				<div className="flex flex-col min-h-screen bg-gray-50">
					<Navbar />

					<main className="flex-grow w-full container mx-auto px-4 py-8">
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/masters" element={<MastersPage />} />
							<Route
								path="/services"
								element={<ServicesPage />}
							/>
							<Route
								path="/booking"
								element={
									<ProtectedRoute>
										<BookingPage />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/dashboard"
								element={
									<ProtectedRoute>
										<UserDashboard />
									</ProtectedRoute>
								}
							/>
							<Route path="/login" element={<LoginPage />} />
							<Route
								path="/register"
								element={<RegisterPage />}
							/>
							<Route
								path="*"
								element={<div>404 — Страница не найдена</div>}
							/>
						</Routes>
					</main>

					<Footer />
				</div>
			</AppProvider>
		</ToastProvider>
	)
}

const WrappedApp = () => (
	<BrowserRouter>
		<AppWithRouter />
	</BrowserRouter>
)

export default WrappedApp
