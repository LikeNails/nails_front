import axios from 'axios'
require('dotenv').config()

const apiClient = axios.create({
	baseURL: `${process.env.API_URL}`, // путь к твоему роуту
})
