
import {createRoot} from 'react-dom/client';
import {Store} from './components/Store/Store'
import { BrowserRouter, Routes, Route, createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import { Navbar } from './components/Navigation/Navbar';
import { AppProvider } from './context/AppProvider';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';

const rootElement = document.getElementById('root')

if(!rootElement){
	throw new Error('root not found')
}

const router = createBrowserRouter(
	[
		{
			path: "/",
			element: 
				<>
					<Navbar />
					<Outlet />
				</>,
			children: [
				{
					index: true,
					element: <div>main</div>
				},
				{
					path: '/basket',
					element: <h1>asdadsd</h1>
				}
			]
		}
	]
)

const container = createRoot(rootElement)

container.render(
	<AppProvider>
		<RouterProvider router={router} />
	</AppProvider>
)
