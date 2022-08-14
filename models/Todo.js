import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		group: {
			type: String,
			required: false,
		},
		comment: {
			type: String,
			required: false,
		},
		status: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('Todolist', TodoSchema)
