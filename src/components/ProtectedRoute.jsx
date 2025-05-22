import React from 'react'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { useAppContext } from '../context/AppContext'

const ProtectedRoute = ({ children }) => {
	const { loading } = useAppContext()
	const accessToken = localStorage.getItem('accessToken')

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
			</div>
		)
	}

	if (!accessToken) {
		return <Navigate to="/login" replace />
	}

	return children
}

export default ProtectedRoute
