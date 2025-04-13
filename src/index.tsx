import React from 'react';
import {createRoot} from 'react-dom/client';
import { Store } from './components/Store/Store';
import { Basket } from './components/Basket/Basket';
import { BrowserRouter, Routes, Route } from 'react-router';
import { AppProvider } from './context/AppProvider';

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
		<Routes>
			<Route path="/" element={<Store />}/>
			<Route path="/register" element={<Basket />}/>
		</Routes>
	</BrowserRouter>
	</AppProvider>
)