import UserModel from "../models/User.js";
import GroupModel from "../models/Group.js";

export const getAll = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId);
		const userId = user._id;
		const group = await GroupModel.find({user: userId})
			.populate("user")
			.exec();

		res.json(group);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Не удалось получить группы",
		});
	}
};

export const getOne = async (req, res) => {
	try {
		const groupId = req.params.id;

		GroupModel.findOne(
			{
				_id: groupId,
			},
			(err, doc) => {
				if (err) {
					console.log(err);
					res.status(500).json({
						message: "Не удалось вернуть группу",
					});
				}

				if (!doc) {
					return res.status(500).json({
						message: "Группа не найдена",
					});
				}

				res.json(doc);
			}
		);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Не удалось получить группы",
		});
	}
};

export const remove = async (req, res) => {
	try {
		const groupId = req.params.id;

		GroupModel.findOneAndDelete(
			{
				_id: groupId,
			},
			(err, doc) => {
				if (err) {
					console.log(error);
					res.status(500).json({
						message: "Не удалось удалить группу",
					});
				}

				if (!doc) {
					return res.status(500).json({
						message: "Группа не найдена",
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
			message: "Не удалось получить группу",
		});
	}
};

export const create = async (req, res) => {
	try {
		const doc = new GroupModel({
			title: req.body.title,
			priority: req.body.priority,
			user: req.userId,
		});

		const todo = await doc.save();
		res.json(todo);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Не удалось создать группу",
		});
	}
};

export const update = async (req, res) => {
	try {
		const groupId = req.params.id;

		await GroupModel.updateOne(
			{
				_id: groupId,
			},
			{
				title: req.body.title,
				priority: req.body.priority,
				user: req.userId,
			}
		);

		res.json({
			success: true,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Не удалось обновить группу",
		});
	}
};
