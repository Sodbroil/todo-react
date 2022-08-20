import { body } from 'express-validator'

export const groupValidation = [
    body('title', 'Введите название группы').isLength({ min: 3 }),
    body('priority', 'Укажите приоритет'),
]
