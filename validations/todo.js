import { body } from 'express-validator'

export const todoValidation = [
	body('title', 'Введите название задачи').isLength({ min: 3 }),
	body('group', 'Укажите группу').optional(),
	body('comment', 'Введите описание задачи').optional(),
	body('status', 'Неверный статус задачи'),
]
