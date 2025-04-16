import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AppProvider } from "./context/AppProvider"; // Импортируем контекст
import {Navbar} from './components/Navigation/Navbar'
import {Container} from './components/Container'
import { Footer } from "./components/Footer/Footer";
import {Store} from './components/Store/Store';
import "./styles/app.css"
// Главный компонент приложения
const App = () => {
	return (
		<AppProvider>
		<BrowserRouter>
			
				<Routes>
					<Route
						path="/"
						element={
							<>
								<Container>
									<Navbar />
									<Outlet />
									<Footer />
								</Container>
							</>
						}
					>
						<Route index element={<Store />} />
						<Route path="basket" element={<h1>asdadsd</h1>} />
					</Route>
				</Routes>
			
		</BrowserRouter>
		</AppProvider>
	);
};

export default App;