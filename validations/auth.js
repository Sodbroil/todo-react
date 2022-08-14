import { body } from 'express-validator'

export const registerValidation = [
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Пароль должен быть минимум 6 символов').isLength({
		min: 6,
	}),
	body('fullName', 'Укажите имя').isLength({ min: 3 }),
]

export const loginValidation = [
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Введите пароль').isLength({
		min: 6,
	}),
]
