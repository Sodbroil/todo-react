import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'todo',
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
// 1
export default mongoose.model('todo', TodoSchema)
