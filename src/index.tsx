
import {createRoot} from 'react-dom/client';
import {App} from './App'

const rootElement = document.getElementById('root')

if(!rootElement){
	throw new Error('root not found')
}


const container = createRoot(rootElement)

container.render(<App />)
