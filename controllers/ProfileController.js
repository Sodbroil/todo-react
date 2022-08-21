import UserModel from "../models/User.js";

export const getInfo = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId);

		if (!user) {
			return res.status(404).json({
				message: 'Пользователь не найден',
			});
		}

		const {passwordHash, ...userData} = user._doc;

		res.json({userData});
	} catch (error) {
		//console.log(err);
		res.status(500).json({
			message: 'Нет доступа',
		});
	}
};