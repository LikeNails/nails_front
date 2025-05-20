import './index.css'
import React from 'react'

import App from './App'

import { createRoot } from 'react-dom/client'

const rootElement = document.getElementById('root')

if (!rootElement) {
	throw new Error('root not found')
}

const container = createRoot(rootElement)

container.render(<App />)
