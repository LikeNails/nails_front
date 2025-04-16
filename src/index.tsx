
import {createRoot} from 'react-dom/client';
import {Store} from './components/Store/Store'
import { BrowserRouter, Routes, Route, createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import { Navbar } from './components/Navigation/Navbar';
import { AppProvider } from './context/AppProvider';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import App from './App'

const rootElement = document.getElementById('root')

if(!rootElement){
	throw new Error('root not found')
}

// const router = createBrowserRouter(
// 	[
// 		{
// 			path: "/",
// 			element: 
// 				<>
// 					{/* <Navbar />
// 					<Box >
// 						<Outlet />
// 					</Box>
// 					<Footer /> */}
// 					<div>
// 						Hello
// 					</div>
// 					<div>
// 						<Outlet />
// 					</div>
// 					<div>
// 						footer
// 					</div>
					
// 				</>,
// 			children: [
// 				{
// 					index: true,
// 					element: <div>main</div>
// 				},
// 				{
// 					path: '/basket',
// 					element: <h1>asdadsd</h1>
// 				}
// 			]
// 		}
// 	]
// )

const container = createRoot(rootElement)

container.render(
		<App/>
)
