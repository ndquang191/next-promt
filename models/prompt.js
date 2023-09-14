import mongoose, { Mongoose, Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
	creator: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	prompt: {
		type: String,
		require: [true, "Prompt is required"],
	},

	tag: {
		type: String,
		required: [true, "Tag is Required"],
	},
});

// const User = model("User", UserSchema);

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
