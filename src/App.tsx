import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AppProvider } from "./context/AppProvider"; // Импортируем контекст
import {Navbar} from './components/Navigation/Navbar'
import { Footer } from "./components/Footer/Footer";
import {Store} from './components/Store/Store';
import {Basket} from './components/Basket/Basket'
import "./styles/app.css"
// Главный компонент приложения
const App = () => {
	return (
		<AppProvider>
		<BrowserRouter>
			<div className = "app-container">
				<Navbar />
				<main className = "content">
					<Routes>
						<Route
							path="/"
							element={<Outlet />}
						>
							<Route path="/" element ={<Outlet/>}/>
							<Route index element={<Store />} />
							<Route path="basket" element={<Basket/>} />
						</Route>
					</Routes>
				</main>
				<Footer/>
			</div>
		</BrowserRouter>
		</AppProvider>
	);
};

export default App;