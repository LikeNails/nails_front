import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { AppContext } from '../../context/AppContext'

import sber from '../../assets/img/sber.png'
import sbp from '../../assets/img/sbp.png'

import './OfferConfirm.css'
type TOfferData = {
	fullName: string
	phoneNumber: string
	email: string
	region: string
	town: string
	street: string
	house: string
	appartments: string
}
export const OfferConfirm = () => {
	const navigate = useNavigate()

	const { products, basket, language, clearBasket } = useContext(AppContext)

	const [sumOfBasket, updateSumOfBasket] = useState<number>(0)

	const [paymentMethod, setPaymentMethod] = useState<string>('sbp')

	const [formData, setFormData] = useState<TOfferData>({
		fullName: '',
		phoneNumber: '',
		email: '',
		region: '',
		town: '',
		street: '',
		house: '',
		appartments: '',
	})

	const basket_products = products
		.filter((product) =>
			basket.offers.some((offer) => offer.product_id === product.id),
		)
		.map((product) => {
			const offer = basket.offers.find(
				(offer) => offer.product_id === product.id,
			)
			return {
				...product,
				quantity: offer ? offer.quantity : 0,
			}
		})

	const calcSummOfBasket = () => {
		let sum = 0
		basket_products.map((offer) => {
			for (let i = 0; i < offer.quantity; i++) {
				sum += offer.price
			}
		})
		updateSumOfBasket(sum)
	}

	useEffect(() => {
		calcSummOfBasket()
	}, [basket])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (
			!formData.fullName ||
			!formData.phoneNumber ||
			!formData.email ||
			!formData.region ||
			!formData.town ||
			!formData.street ||
			!formData.house
		) {
			alert('Заполните все обязательные поля!')
			return
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(formData.email)) {
			alert('Введите корректный email!')
			return
		}
		alert(
			`Заказ успешно оформлен, данные заказа \n ${JSON.stringify({ paymentMethod, ...formData })}`,
		)
		console.log({ paymentMethod, ...formData })
		clearBasket()
		navigate('/')
	}

	return (
		<div className="offer-confirm">
			<div className="offer-confirm__header">Подтвердите заказ</div>
			<div className="offer-confirm__sum-string">
				<span className="offer-confirm__sum">Сумма заказа:</span>
				<span className="offer-confirm__sum--sum">{`₽ ${sumOfBasket}`}</span>
			</div>

			<form className="offer-confirm__form" onSubmit={handleSubmit}>
				<hr className="offer-confirm__hr" />
				<div className="offer-confirm__bio-block">
					<div className="offer-confirm__block-header">
						Данные покупателя
					</div>

					<div className="offer-confirm__input-header">
						Электронная почта
					</div>
					<input
						name="email"
						placeholder="test@gmail.com"
						className="offer-confirm__input input-email"
						autoComplete="email"
						onChange={handleInputChange}
					/>
					<div className="offer-confirm__input-header">ФИО</div>
					<input
						name="fullName"
						placeholder="Иванов Иван Иванович"
						className="offer-confirm__input input-bio"
						autoComplete="name"
						onChange={handleInputChange}
					/>
					<div className="offer-confirm__input-header">
						Номер телефона
					</div>

					<input
						name="phoneNumber"
						placeholder="800553535"
						className="offer-confirm__input input-tel"
						onChange={handleInputChange}
					/>
				</div>
				<div className="offer-confirm__delivery-block">
					<hr className="offer-confirm__hr" />
					<div className="offer-confirm__block-header">
						Введите адрес
					</div>
					<div className="offer-confirm__input-header">Регион</div>
					<input
						placeholder="Московская область"
						name="region"
						className="offer-confirm__input input-region"
						autoComplete="address-level1"
						onChange={handleInputChange}
					/>
					<div className="offer-confirm__input-header">Город</div>
					<input
						placeholder="Москва"
						name="town"
						className="offer-confirm__input input-adress"
						autoComplete="address-level2"
						onChange={handleInputChange}
					/>
					<div className="offer-confirm__input-header">Улица</div>
					<input
						placeholder="Мира"
						name="street"
						className="offer-confirm__input input-street"
						autoComplete="adress-line1"
						onChange={handleInputChange}
					/>
					<div className="offer-confirm__input-header">Дом</div>
					<input
						placeholder="9"
						name="house"
						className="offer-confirm__input input-house"
						onChange={handleInputChange}
						autoComplete="address-line2"
					/>
					<div className="offer-confirm__input-header">Квартира</div>
					<div className="offer-confirm__unrequired-header">
						Необязательное поле
					</div>
					<input
						placeholder="кв. 37"
						name="appartments"
						className="offer-confirm__input input-appartments"
						autoComplete="address-line3"
						onChange={handleInputChange}
					/>
				</div>
				<div className="offer-confirm__payment-choose-block">
					<button
						type="button"
						onClick={() => setPaymentMethod('sbp')}
						className="offer-confirm__payment"
					>
						<img src={sber} />
						<div
							className={
								paymentMethod === 'sbp'
									? 'payment-checker--selected'
									: 'payment-checker'
							}
						/>
					</button>
					<button
						type="button"
						onClick={() => setPaymentMethod('sber')}
						className="offer-confirm__payment"
					>
						<img src={sbp} />
						<div
							className={
								paymentMethod === 'sber'
									? 'payment-checker--selected'
									: 'payment-checker'
							}
						/>
					</button>
				</div>
				<button type="submit" className="offer-confirm__confirm-button">
					Оформить заказ
				</button>
			</form>
		</div>
	)
}
