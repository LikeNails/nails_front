// App.tsx

import React from 'react'
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

const App = () => {
	return (
		<BrowserRouter>
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
								path="/booking/:masterId"
								element={<BookingPage />}
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
		</BrowserRouter>
	)
}

export default App
