import UserModel from "../models/User.js";
import TodoModel from "../models/Todo.js";
import GroupModel from "../models/Group.js";

export const getCount = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId);
		const userId = user._id
		const todo = await TodoModel.collection.countDocuments({user: userId})
		const group = await GroupModel.collection.countDocuments({user: userId})
		const todoStart = await TodoModel.collection.countDocuments({user: userId, status: 'В процессе'})
		const todoEnd = await TodoModel.collection.countDocuments({user: userId, status: 'Завершена'})

		res.json({
			todo: todo,
			group: group,
			todoStart: todoStart,
			todoEnd: todoEnd
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Не удалось получить количество',
		});
	}
};
