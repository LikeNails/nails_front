// components/ToastProvider.jsx
import React, { createContext, useState, useContext, useCallback } from 'react'

const ToastContext = createContext()

export const useToast = () => useContext(ToastContext)

export const ToastProvider = ({ children }) => {
	const [toasts, setToasts] = useState([])

	const addToast = useCallback((message, type = 'success') => {
		const id = Math.random().toString(36).substr(2, 9)
		setToasts((prev) => [...prev, { id, message, type }])
		setTimeout(() => {
			setToasts((prev) => prev.filter((toast) => toast.id !== id))
		}, 3000)
	}, [])

	const removeToast = useCallback((id) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id))
	}, [])

	return (
		<ToastContext.Provider value={{ addToast }}>
			{children}
			<div className="fixed bottom-4 right-4 z-50 space-y-2">
				{toasts.map((toast) => (
					<div
						key={toast.id}
						className={`p-3 rounded-md shadow-lg text-white ${
							toast.type === 'success'
								? 'bg-green-600'
								: 'bg-red-600'
						}`}
					>
						<div className="flex justify-between items-center">
							<span>{toast.message}</span>
							<button
								onClick={() => removeToast(toast.id)}
								className="ml-4 text-sm font-bold"
							>
								×
							</button>
						</div>
					</div>
				))}
			</div>
		</ToastContext.Provider>
	)
}
