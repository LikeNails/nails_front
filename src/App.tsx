import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { AppProvider } from './context/AppProvider'
import { Navbar } from './components/Navigation/Navbar'
import { Footer } from './components/Footer/Footer'
import { Store } from './components/Store/Store'
import { Basket } from './components/Basket/Basket'
import './styles/app.css'
import { FooterMobile } from './components/Footer/FooterMobile'
import { OfferConfirm } from './components/OfferConfirm/OfferConfirm'

const App = () => {
	return (
		<AppProvider>
			<BrowserRouter>
				<div className="app-container">
					<Navbar />
					<main className="content">
						<Routes>
							<Route path="/" element={<Outlet />}>
								<Route path="/" element={<Outlet />} />
								<Route index element={<Store />} />
								<Route
									path="basket"
									element={<Basket />}
								></Route>
								<Route
									path="confirm"
									element={<OfferConfirm />}
								/>
							</Route>
							<Route path="*" element={<div>404Error</div>} />
						</Routes>
					</main>
					<Footer />
					<FooterMobile />
				</div>
			</BrowserRouter>
		</AppProvider>
	)
}

export default App
