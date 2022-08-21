import TodoModel from '../models/Todo.js';
import UserModel from '../models/User.js'


export const getAll = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId);
		const userId = user._id
		const todo = await TodoModel.find({user: userId}).populate('user').exec();

		res.json(todo);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Не удалось получить задачи',
		});
	}
};
// 11
export const getOne = async (req, res) => {
	try {
		const todoId = req.params.id;

		TodoModel.findOne(
			{
				_id: todoId,
			},
			(err, doc) => {
				if (err && doc) {
					res.status(500).json({
						message: 'Не удалось вернуть задачу',
					});
				}

				if (!doc && err) {
					return res.status(500).json({
						message: 'Задача не найдена',
					});
				}

				res.json(doc);
			}
		);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Не удалось получить задачи',
		});
	}
};

export const remove = async (req, res) => {
	try {
		const todoId = req.params.id;

		TodoModel.findOneAndDelete(
			{
				_id: todoId,
			},
			(err, doc) => {
				if (err) {
					console.log(error);
					res.status(500).json({
						message: 'Не удалось удалить задачу',
					});
				}

				if (!doc) {
					return res.status(500).json({
						message: 'Задача не найдена',
					});
				}
			}
		);

		res.json({
			success: true,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Не удалось получить задачи',
		});
	}
};

export const create = async (req, res) => {
	try {
		const doc = new TodoModel({
			title: req.body.title,
			group: req.body.group,
			comment: req.body.comment,
			status: req.body.status,
			user: req.userId,
		});

		const todo = await doc.save();
		res.json(todo);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Не удалось создать задачу',
		});
	}
};

export const update = async (req, res) => {
	try {
		const todoId = req.params.id;

		await TodoModel.updateOne(
			{
				_id: todoId,
			},
			{
				title: req.body.title,
				group: req.body.group,
				comment: req.body.comment,
				status: req.body.status,
				user: req.userId,
			}
		);

		res.json({
			success: true,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Не удалось обновить задачу',
		});
	}
};
