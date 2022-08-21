import mongoose from 'mongoose'

const GroupSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'group',
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		priority: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('group', GroupSchema)
