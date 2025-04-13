import React from 'react';
import {createRoot} from 'react-dom/client';
import { Store } from './components/Store/Store';
import { Basket } from './components/Basket/Basket';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppProvider';
import { Navbar } from './components/Navigation/Navbar';
import { Footer } from './components/Footer/Footer';

const root = document.getElementById('root')

if(!root){
	throw new Error('root not found')
}



// const AppContext = React.createContext<TAppContext>({
// 	products: [],
// 	basket: {
// 		offers: [],
// 		count: 0
// 	}
// })

const container = createRoot(root)

container.render(
	<AppProvider>
		<BrowserRouter>
			<Navbar />
			<Routes>
				{/* <Route path="/" element={<Store />}/> */}
				<Route path="/" element={<div>Hello</div>}/>
				{/* <Route path="/register" element={<Basket />}/> */}
			</Routes>
			<Footer />
		</BrowserRouter>
	</AppProvider>
)